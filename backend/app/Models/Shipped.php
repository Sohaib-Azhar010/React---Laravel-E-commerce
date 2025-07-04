<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shipped extends Model
{
    protected $fillable = [
        'order_id',
        'order_item_id',
    ];
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }
}
