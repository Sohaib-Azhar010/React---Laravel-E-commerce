<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\Api\NewsletterController;





Route::post("/admin/login", [AuthController::class, 'authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::group(['milldeware' => 'auth:sanctum'], function () {

    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::get('sizes', [SizeController::class, 'index']);
    Route::resource('products', ProductController::class);
    Route::get('featured-products', [ProductController::class, 'featured']);
    Route::get('latest-products', [ProductController::class, 'latest']);
    Route::get('shop', [ProductController::class, 'shop']);
    Route::post('temp-images', [TempImageController::class, 'store']);
    Route::post('/products/{id}/reviews', [ReviewController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::get('/orders/{id}/receipt', [OrderController::class, 'downloadReceipt']);
    Route::post('/orders/{id}/ship', [OrderController::class, 'markShipped']);
    Route::get('/shippeds', [OrderController::class, 'getShipped']);
    Route::get('/newsletters', [NewsletterController::class, 'index']);
    Route::delete('/newsletters/{id}', [NewsletterController::class, 'destroy']);
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::delete('/admin/contacts/{id}', [ContactController::class, 'destroy']);
    Route::get('/dashboard-metrics', [DashboardController::class, 'metrics']);
});

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/newsletter', [NewsletterController::class, 'store']);
Route::post('/order', [OrderController::class, 'store']);
