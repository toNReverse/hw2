<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth; // aggiungi in cima


class CollectionController extends BaseController
{
    public function home()
    {
        if (!Session::get('user_id')) {
            return redirect('/login'); // ← QUESTO crea il ciclo!
        }
        return view('home');
    }
    public function profile()
    {
        $user_id = Session::get('user_id');

        if (!$user_id) {
            return redirect('/login');
        }

        $user = User::find($user_id);

        if (!$user) {
            abort(404); // O redirect con errore
        }

        // Passa i dati alla view
        return view('profile', ['userinfo' => [
            'name' => $user->name,
            'email' => $user->email
        ]]);
    }
}