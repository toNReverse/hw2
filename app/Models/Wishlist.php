<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $table = 'wishlist';  // nome esatto tabella nel DB

    public $timestamps = false; // se non usi created_at/updated_at
}