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
}