<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 */
class User extends Model
{
    public $timestamps = false;

    public function favorites()
    {
        return $this->hasMany(\App\Models\Wishlist::class);
    }

    public function cartItems()
    {
        return $this->hasMany(\App\Models\Cart::class);
    }
}