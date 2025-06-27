<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WishlistController;

Route::get('/', function () {
    return redirect('login');
});

Route::get('login', 'App\Http\Controllers\LoginController@login_form');
Route::post('login', 'App\Http\Controllers\LoginController@do_login');

Route::get('register', 'App\Http\Controllers\LoginController@register_form');
Route::post('register', 'App\Http\Controllers\LoginController@do_register');

Route::get('logout', 'App\Http\Controllers\LoginController@logout');

Route::get('home', 'App\Http\Controllers\HomeController@home');

Route::get('profile', 'App\Http\Controllers\HomeController@profile');

Route::get('/fetch-cart', 'App\Http\Controllers\CartController@fetchCart');
Route::post('/remove-from-cart', 'App\Http\Controllers\CartController@removeFromCart');

//

Route::get('wishlist', [WishlistController::class, 'wishlist']);
Route::get('load-favorites', [WishlistController::class, 'loadFavorites']);
Route::post('remove-product', [WishlistController::class, 'removeProduct']);
//