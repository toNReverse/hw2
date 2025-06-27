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
        if (!Auth::check()) {
            return redirect('/login');
        }
    
        return view('home');
    }



}