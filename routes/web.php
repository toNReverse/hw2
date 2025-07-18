<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('login');
});

Route::get('login', 'App\Http\Controllers\LoginController@login_form');
Route::post('login', 'App\Http\Controllers\LoginController@do_login');

Route::get('register', 'App\Http\Controllers\LoginController@register_form');
Route::post('register', 'App\Http\Controllers\LoginController@do_register');
Route::get('/check-email', 'App\Http\Controllers\LoginController@checkEmail');

Route::get('logout', 'App\Http\Controllers\LoginController@logout');

Route::get('home', 'App\Http\Controllers\HomeController@home');

Route::get('profile', 'App\Http\Controllers\HomeController@profile');

//wishlist
Route::get('wishlist', 'App\Http\Controllers\WishlistController@wishlist');
Route::get('load-favorites', 'App\Http\Controllers\WishlistController@loadFavorites');
Route::post('remove-product', 'App\Http\Controllers\WishlistController@removeProduct');

//search
Route::get('/search', 'App\Http\Controllers\SearchController@search');

//wishlist search
Route::post('/save-product', 'App\Http\Controllers\WishlistController@save');

//cart search
Route::get('/fetch-cart', 'App\Http\Controllers\CartController@fetchCart');
Route::post('/add-to-cart', 'App\Http\Controllers\CartController@addToCart');
Route::post('/remove-from-cart', 'App\Http\Controllers\CartController@removeFromCart');

//api
Route::get('/convert_currency', 'App\Http\Controllers\APIController@convertCurrency');
Route::get('/translate', 'App\Http\Controllers\APIController@translate');
Route::post('/checkout/session', 'App\Http\Controllers\APIController@createSession');