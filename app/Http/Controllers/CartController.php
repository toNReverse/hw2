<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;


class CartController extends BaseController
{
    public function fetchCart(Request $request)
    {
        // Recupera user_id dalla sessione
        $userId = session('user_id');

        if (!$userId) {
            return response()->json([]);
        }

        // Query al database
        $products = DB::table('cart')
            ->where('user_id', $userId)
            ->get();

        return response()->json($products);
    }

    public function removeFromCart(Request $request)
    {
        $userid = Session::get('user_id');
        if (!$userid) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato'], 401);
        }

        $title = $request->input('title');
        if (!$title) {
            return response()->json(['ok' => false, 'error' => 'Titolo mancante']);
        }

        $deleted = DB::table('cart')
            ->where('user_id', $userid)
            ->where('title', $title)
            ->delete();

        if ($deleted) {
            return response()->json(['ok' => true]);
        } else {
            return response()->json(['ok' => false, 'error' => 'Nessun elemento rimosso']);
        }
    }
    public function addToCart(Request $request)
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato']);
        }
    
        \Log::info('Richiesta addToCart', $request->all());
    
        $title = $request->input('title');
        $thumbnail = $request->input('thumbnail');
        $price = $request->input('price');
    
        if (!$title || !$thumbnail || !$price) {
            return response()->json(['ok' => false, 'error' => 'Dati mancanti']);
        }
    
        try {
            $exists = DB::table('cart')
                ->where('user_id', $userId)
                ->where('title', $title)
                ->exists();
    
            if ($exists) {
                return response()->json(['ok' => false, 'error' => 'Prodotto già presente']);
            }
    
            DB::table('cart')->insert([
                'user_id' => $userId,
                'title' => $title,
                'thumbnail' => $thumbnail,
                'price' => $price,
                'created_at' => now(),
                'updated_at' => now()
            ]);
    
            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            \Log::error('Errore addToCart: ' . $e->getMessage());
            return response()->json(['ok' => false, 'error' => 'Errore server']);
        }
    }
}