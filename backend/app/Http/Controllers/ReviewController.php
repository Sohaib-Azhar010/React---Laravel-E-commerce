<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $product = Product::findOrFail($productId);

        $review = new Review($validated);
        $product->reviews()->save($review);

        return response()->json([
            'status' => 201,
            'message' => 'Review submitted successfully!',
            'data' => $review,
        ]);
    }
}
