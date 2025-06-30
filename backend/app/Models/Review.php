<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['product_id', 'name', 'review', 'rating'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
