<?php

use App\Http\Controllers\Api\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


// Route::get('/admin/orders/{order}/receipt', [OrderController::class, 'downloadReceipt']);
