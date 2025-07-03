<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request, $id)
    {
        $product = Product::with('images')->find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

        $cart = session()->get('cart', []);

        // If product already in cart, increase quantity
        if (isset($cart[$id])) {
            $cart[$id]['quantity']++;
        } else {
            $cart[$id] = [
                'id' => $product->id,
                'title' => $product->title,
                'price' => $product->price,
                'image' => $product->images->first()->image ?? 'default.jpg',
                'quantity' => 1,
            ];
        }

        session()->put('cart', $cart);

        return response()->json([
            'status' => 200,
            'message' => 'Product added to cart successfully',
            'cart' => $cart[$id]
        ]);
    }
    //     public function addToCart(Request $request, $id)
    // {
    //     return response()->json([
    //         'status' => 200,
    //         'message' => "Received product ID: $id"
    //     ]);
    // }


    public function getCart()
    {
        $cart = session()->get('cart', []);
        return response()->json(['status' => 200, 'cart' => $cart]);
    }

    public function removeFromCart($id)
    {
        $cart = session()->get('cart', []);
        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product removed from cart',
            'cart' => $cart,
        ]);
    }

    public function clearCart()
    {
        session()->forget('cart');
        return response()->json(['status' => 200, 'message' => 'Cart cleared']);
    }
}
