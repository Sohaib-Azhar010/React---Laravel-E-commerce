<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'title',
        'price',
        'compare_price',
        'description',
        'short_description',
        'category_id',
        'brand_id',
        'qty',
        'sku',
        'barcode',
        'status',
        'is_featured',
        'image',
    ];


    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
