<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CartController;


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

//wishlist
Route::get('wishlist', [WishlistController::class, 'wishlist']);
Route::get('load-favorites', [WishlistController::class, 'loadFavorites']);
Route::post('remove-product', [WishlistController::class, 'removeProduct']);
//search
Route::get('/search', [SearchController::class, 'search']);
Route::get('/fetch-products', [SearchController::class, 'fetch']);
//wishlist search
Route::post('/save-product', [WishlistController::class, 'save']);
Route::post('/remove-product', [WishlistController::class, 'removeProduct']);
//cart search
Route::get('/fetch-cart', [CartController::class, 'loadCart']);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::post('/remove-from-cart', [CartController::class, 'removeFromCart']);