<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class OrderItem extends Model
{


    protected $fillable = [
        'order_id',
        'product_id',
        'title',
        'price',
        'quantity',
        'image',

    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
