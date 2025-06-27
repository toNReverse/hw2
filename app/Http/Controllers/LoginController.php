<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class LoginController extends BaseController
{
    public function register_form()
    {
        if (Session::get('user_id')) {
            return redirect('/home');
        }

        $error = Session::get('error');
        Session::forget('error');

        return view('register')->with('error', $error);
    }

    public function do_register()
    {
        if (Session::get('user_id')) {
            return redirect('/home');
        }

        if (strlen(request('name')) == 0) {
            Session::put('error', ['Devi inserire il tuo nome']);
            return redirect('register')->withInput();
        }

        else if (strlen(request('email')) == 0) {
            Session::put('error', ['Email obbligatoria']);
            return redirect('register')->withInput();
        }

        else if (!filter_var(request('email'), FILTER_VALIDATE_EMAIL)) {
            Session::put('error', ['Indirizzo email non valido']);
            return redirect('register')->withInput();
        }

        else if (strlen(request('password')) == 0) {
            Session::put('error', ['Password obbligatoria']);
            return redirect('register')->withInput();
        }

        else if (strlen(request('password')) < 8) {
            Session::put('error', ['La password deve contenere almeno 8 caratteri']);
            return redirect('register')->withInput();
        }

        else if (strlen(request('confirm_password')) == 0) {
            Session::put('error', ['Devi confermare la password']);
            return redirect('register')->withInput();
        }

        else if (request('password') !== request('confirm_password')) {
            Session::put('error', ['Le password non corrispondono']);
            return redirect('register')->withInput();
        }

        else if (!request('allow')) {
            Session::put('error', ['Devi accettare i termini e condizioni']);
            return redirect('register')->withInput();
        }

        else if (User::where('email', request('email'))->first()) {
            Session::put('error', ['Email già registrata']);
            return redirect('register')->withInput();
        }

        // === CREAZIONE UTENTE ===
        $user = new User;
        $user->name = request('name');
        $user->email = request('email');
        $user->password = password_hash(request('password'), PASSWORD_BCRYPT);
        $user->save();

        // === LOGIN AUTOMATICO ===
        Session::put('user_id', $user->id);
        Session::put('_agora_name', $user->name);

        return redirect('/home');
    }
    public function login_form()
    {
        if (Session::get('user_id')) {
            return redirect('/home');
        }

        $error = Session::get('error');
        Session::forget('error');

        return view('login')->with('error', $error);
    }

    public function do_login()
    {
        if (Session::get('user_id')) {
            return redirect('/home');
        }

        $user = User::where('email', request('email'))->first();
        if(!$user || !password_verify(request('password'), $user->password)) {
            Session::put('error', ['Email o password errati']);
            return redirect('login')->withInput();
        }

        // === LOGIN AUTOMATICO ===
        Session::put('user_id', $user->id);

        return redirect('/home');

    }
    // === LOGOUT ===
    public function logout(){
        // Elimina dati di sessione
        Session::flush();
        return redirect('login');
    }
}