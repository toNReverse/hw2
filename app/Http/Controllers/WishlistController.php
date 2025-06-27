<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class WishlistController extends BaseController
{public function wishlist()
    {
        $userId = session('user_id');
    
        if (!$userId) {
            return redirect('login');
        }
    
        // recupera i preferiti dal database per l'utente
        $favorites = \App\Models\Wishlist::where('user_id', $userId)->get();
    
        return view('wishlist', ['favorites' => $favorites]);
    }
}