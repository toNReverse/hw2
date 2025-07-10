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
        return view('wishlist', compact('favorites'));  // Passa i preferiti alla vista
    }

    public function loadFavorites()
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json([]);
        }

        $favorites = Wishlist::where('user_id', $userId)->get();

        return response()->json($favorites);    // Restituisce i preferiti come JSON (caricamento dinamico)
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
    public function save(Request $request)
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json(['ok' => false, 'error' => 'Utente non autenticato']);
        }

        $title = $request->input('title');
        $thumbnail = $request->input('thumbnail');
        $price = $request->input('price');

        if (!$title || !$thumbnail) {
            return response()->json(['ok' => false, 'error' => 'Dati mancanti']);
        }

        // Controlla se esiste già
        $existing = Wishlist::where('user_id', $userId)->where('title', $title)->first();
        if ($existing) {
            return response()->json(['ok' => false, 'error' => 'Prodotto già nei preferiti']);
        }

        // Crea nuovo record
        $item = Wishlist::create([
            'user_id' => $userId,
            'title' => $title,
            'thumbnail' => $thumbnail,
            'price' => $price ?? 0
        ]);

        return response()->json(['ok' => true, 'id' => $item->id]);
    }
}