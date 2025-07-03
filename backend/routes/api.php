<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::post('/cart/add/{id}', [CartController::class, 'addToCart']);
Route::get('/cart', [CartController::class, 'getCart']);
Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
Route::post('/cart/clear', [CartController::class, 'clearCart']);



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
});


Route::post('/cart/add/{id}', [CartController::class, 'addToCart']);
Route::get('/cart', [CartController::class, 'getCart']);
Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);
Route::post('/cart/clear', [CartController::class, 'clearCart']);