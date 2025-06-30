<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
