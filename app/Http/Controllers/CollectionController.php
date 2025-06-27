<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class CollectionController extends BaseController
{
    public function list()
    {
        //Controllo accesso
        if (!Session::get('user_id')) {
            return redirect('/login');
        }
        return Session::get('user_id'); //view('home');
    }
}