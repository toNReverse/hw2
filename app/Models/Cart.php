<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'title', 'price', 'thumbnail'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}