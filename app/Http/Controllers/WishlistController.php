<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;          
use App\Models\Wishlist;

class WishlistController extends BaseController
{
    public function wishlist()
    {
        $userId = session('user_id');
        if (!$userId) return redirect('login');
    
        $favorites = Wishlist::where('user_id', $userId)->get();
        return view('wishlist', compact('favorites'));
    }

    public function loadFavorites()
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json([]);
        }

        $favorites = Wishlist::where('user_id', $userId)->get();

        return response()->json($favorites);
    }

    public function removeProduct(Request $request)
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato']);
        }

        $id = $request->input('id');
        if (!$id) {
            return response()->json(['ok' => false, 'error' => 'ID prodotto mancante']);
        }

        $deleted = Wishlist::where('user_id', $userId)
            ->where('id', $id)
            ->delete();

        if ($deleted) {
            return response()->json(['ok' => true]);
        } else {
            return response()->json(['ok' => false, 'error' => 'Impossibile rimuovere il prodotto']);
        }
    }
}