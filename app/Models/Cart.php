<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string|null $snippet
 * @property float $price
 * @property string $thumbnail
 */
class Cart extends Model
{
    protected $table = 'cart';
    public $timestamps = false;

    protected $fillable = ['user_id', 'title', 'snippet', 'price', 'thumbnail'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}