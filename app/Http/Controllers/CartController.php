<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\Cart;

class CartController extends BaseController
{
    public function fetchCart(Request $request)
    {
        $userId = $request->session()->get('user_id');

        if (!$userId) {
            return response()->json([]);
        }

        $products = Cart::where('user_id', $userId)->get();

        return response()->json($products);
    }

    public function addToCart(Request $request)
    {
        $userId = $request->session()->get('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato']);
        }

        $title = $request->input('title');
        $thumbnail = $request->input('thumbnail');
        $price = $request->input('price');

        if (!$title || !$thumbnail) {
            return response()->json(['ok' => false, 'error' => 'Dati mancanti']);
        }

        $existing = Cart::where('user_id', $userId)->where('title', $title)->first();
        if ($existing) {
            return response()->json(['ok' => false, 'error' => 'Prodotto già nel carrello']);
        }

        $item = Cart::create([
            'user_id' => $userId,
            'title' => $title,
            'thumbnail' => $thumbnail,
            'price' => $price ?? 0
        ]);

        return response()->json(['ok' => true, 'id' => $item->id]);
    }

    public function removeFromCart(Request $request)
    {
        $userId = $request->session()->get('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato']);
        }

        $id = $request->input('id');
        if (!$id) {
            return response()->json(['ok' => false, 'error' => 'ID prodotto mancante']);
        }

        $deleted = Cart::where('user_id', $userId)
            ->where('id', $id)
            ->delete();

        if ($deleted) {
            return response()->json(['ok' => true]);
        } else {
            return response()->json(['ok' => false, 'error' => 'Impossibile rimuovere il prodotto']);
        }
    }

    // Metodo ridondante: fetchCart e loadCart fanno la stessa cosa
    public function loadCart(Request $request)
    {
        return $this->fetchCart($request);
    }
}