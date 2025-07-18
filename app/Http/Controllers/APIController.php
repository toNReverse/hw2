<?php
namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;          
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Cart;


class ApiController extends BaseController
{
    public function translate(Request $request)
    {
        $text = $request->query('text');
        $to = $request->query('to');
        $from = 'it';   // lingua di partenza fissa
    
        if (!$text || !$to) {
            return response()->json(['error' => 'Parametri mancanti'], 400);
        }

        $url = "https://api.mymemory.translated.net/get?q=" . urlencode($text) . "&langpair={$from}|{$to}";
    
        $ch = curl_init($url);  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch); 
        $curlError = curl_error($ch);
        curl_close($ch);   
        
        if ($response === false || $curlError) {
            return response()->json(['error' => 'Errore nella richiesta API di traduzione: ' . $curlError], 500);
        }
        
        // Decodifica la risposta JSON
        $data = json_decode($response, true);
    
        if (!$data || !isset($data['responseData']['translatedText'])) {
            return response()->json(['error' => 'Risposta non valida dall\'API di traduzione'], 500);
        }
    
        return response()->json([
            'translatedText' => $data['responseData']['translatedText'],
        ]);
    }

    public function convertCurrency(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');
        $amount = $request->query('amount');
    
        if (!$from || !$to || !$amount) {
            return response()->json(['error' => 'Dati mancanti'], 400);
        }
    
        $apiKey = env('EXCHANGE_API_KEY');  // <--- chiave da .env
        $url = "https://v6.exchangerate-api.com/v6/$apiKey/latest/$from";
    
        $response = file_get_contents($url);
        if ($response === false) {
            return response()->json(['error' => 'Errore nella richiesta API'], 500);
        }
    
        $data = json_decode($response, true);
    
        if (!isset($data['conversion_rates'][$to])) {
            return response()->json(['error' => 'Valuta non supportata'], 400);
        }
    
        $rate = $data['conversion_rates'][$to];
        $converted = round($amount * $rate, 2);
    
        return response()->json([
            'converted' => $converted,
            'rate' => $rate,
            'symbol' => $to
        ]);
    }
    public function createSession(Request $request)
    {
        $stripePublicKey = env('STRIPE_PUBLIC_KEY');
        $stripeSecretKey = env('STRIPE_SECRET_KEY');
    
        Stripe::setApiKey($stripeSecretKey);
    
        $userId = session('user_id');
        if (!$userId) {
            return response()->json(['error' => 'Utente non autenticato'], 403);
        }
    
        $cartItems = Cart::where('user_id', $userId)->get();
        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Carrello vuoto'], 400);
        }
    
        $lineItems = [];
    
        foreach ($cartItems as $item) {
            $price = floatval($item->price);     // forza conversione a float (0 se non convertibile)
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item->title,
                    ],
                    'unit_amount' => intval($price * 100),
                ],
                'quantity' => 1
            ];
        }
    
        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => url('/'),
            'cancel_url' => url('/'),
        ]);
    
        return response()->json([
            'id' => $session->id,
            'publicKey' => $stripePublicKey
        ]);
    }
}