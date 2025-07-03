<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;


class Order extends Model
{
    protected $fillable = [
        'name',
        'email',
        'address',
        'city',
        'state',
        'zip',
        'mobile',
        'payment_method',
        'subtotal',
        'shipping',
        'total',
    ];

    public function items()
{
    return $this->hasMany(OrderItem::class);
}

}
