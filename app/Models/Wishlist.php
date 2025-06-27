<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $table = 'wishlist';  // nome esatto della tabella

    public $timestamps = false;

    protected $fillable = ['user_id', 'title', 'price', 'thumbnail'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}