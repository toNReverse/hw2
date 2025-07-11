<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;


class CartController extends BaseController
{
    public function fetchCart(Request $request)
    {
        $userId = session('user_id');

        if (!$userId) {
            return response()->json([]);
        }

        $products = DB::table('cart')
            ->where('user_id', $userId) // query al database
            ->get();    // recupera i risultati come una collezione di oggetti.

        return response()->json($products);
    }
    public function addToCart(Request $request)
    {
        $userId = $request->session()->get('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato'], 401);
        }
        
        $title = $request->input('title');
        $thumbnail = $request->input('thumbnail');
        $snippet = $request->input('snippet', '');
        $price = $request->input('price', '');
        
        if (!$title || !$thumbnail) {
            return response()->json(['ok' => false, 'error' => 'Dati mancanti'], 400);
        }
    
        $exists = DB::table('cart')
            ->where('user_id', $userId)
            ->where('title', $title)
            ->exists();
    
        if ($exists) {
            return response()->json(['ok' => false, 'error' => 'Prodotto già nel carrello'], 409);
        }
        
        $inserted = DB::table('cart')->insert([
            'user_id' => $userId,
            'title' => $title,
            'snippet' => $snippet,
            'price' => $price,
            'thumbnail' => $thumbnail,
        ]);
    
        if ($inserted) {
            return response()->json(['ok' => true]);
        } else {
            return response()->json(['ok' => false, 'error' => 'Errore nell\'inserimento'], 500);
        }
    }
    
    public function removeFromCart(Request $request)
    {
        $userId = $request->session()->get('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato'], 401);
        }
    
        $title = $request->input('title');
        if (!$title) {
            return response()->json(['ok' => false, 'error' => 'Titolo mancante'], 400);
        }
        
        $deleted = DB::table('cart')
            ->where('user_id', $userId)
            ->where('title', $title)
            ->delete();
    
        if ($deleted) {
            return response()->json(['ok' => true]);
        } else {
            return response()->json(['ok' => false, 'error' => 'Errore nella rimozione'], 500);
        }
    }
    public function loadCart(Request $request)
    {
        $userId = $request->session()->get('user_id');
        if (!$userId) {
            return response()->json([]); 
        }
    
        $cartItems = DB::table('cart')
            ->where('user_id', $userId)
            ->get();
    
        return response()->json($cartItems);
    }
}