<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $snippet
 * @property float $price
 * @property string $thumbnail
 */
class Wishlist extends Model
{
    protected $table = 'wishlist'; 

    public $timestamps = false;

    protected $fillable = ['user_id', 'title', 'price', 'thumbnail'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}