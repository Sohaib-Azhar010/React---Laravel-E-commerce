<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Arr;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
        ]);
    }

    public function show($id)
    {

        $product = Product::find($id);

        $latestReviews = Review::where('product_id', $product->id)
            ->latest()
            ->take(5)
            ->get();

        $totalReviews = Review::where('product_id', $product->id)->count();
        $averageRating = Review::where('product_id', $product->id)->avg('rating');

        // 💡 Remove 'reviews' relation from the product object to prevent recursion
        $cleanProduct = Arr::except($product->toArray(), ['reviews']);

        return response()->json([
            'status' => 200,
            'data' => [
                'product' => $cleanProduct,
                'reviews' => $latestReviews,
                'total_reviews' => $totalReviews,
                'average_rating' => round($averageRating, 1)
            ]
        ]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|integer|exists:categories,id',
            'sku' => 'required|string',
            'status' => 'required|integer|in:0,1',
            'is_featured' => 'required|in:yes,no',
            'compare_price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'qty' => 'nullable|integer|min:0',
            'barcode' => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*' => 'integer|exists:temp_images,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        }

        $data = $validator->validated();

        // Create product (image will be added after processing gallery)
        $product = Product::create($data);

        // Handle gallery images (optional)
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImg = TempImage::find($tempImageId);

                if (!$tempImg) {
                    Log::warning("Temp image not found for ID: {$tempImageId}");
                    continue;
                }

                $ext = pathinfo($tempImg->name, PATHINFO_EXTENSION);
                $imageName = $product->id . '_' . $key . '.' . $ext;

                $sourcePath = public_path("uploads/temp/{$tempImg->name}");

                if (!file_exists($sourcePath)) {
                    Log::error("Temp file does not exist: {$sourcePath}");
                    continue;
                }

                $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());

                // Save large image
                $imgLarge = $manager->read($sourcePath)->scaleDown(1200);
                $imgLarge->save(public_path("uploads/products/large/{$imageName}"));

                // Save small image
                $imgSmall = $manager->read($sourcePath)->coverDown(400, 460);
                $imgSmall->save(public_path("uploads/products/small/{$imageName}"));

                if ($key === 0) {
                    $product->image = $imageName;
                    $product->save();
                }

                // ✅ Delete temp files and DB entry
                @unlink(public_path("uploads/temp/{$tempImg->name}"));
                @unlink(public_path("uploads/temp/thumb/{$tempImg->name}"));
                $tempImg->delete();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product created successfully',
            'data' => $product,
        ]);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'compare_price' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'category_id' => 'required|integer|exists:categories,id',
            'brand_id' => 'nullable|integer|exists:brands,id',
            'qty' => 'nullable|integer',
            'sku' => 'required|string',
            'barcode' => 'nullable|string',
            'status' => 'required|integer|in:0,1',
            'is_featured' => 'required|in:yes,no',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        }

        $product = Product::findOrFail($id);
        $data = $validator->validated();

        // ✅ If a new image is uploaded
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/products/small'), $imageName);
            $data['image'] = $imageName;

            // Delete old image
            if ($product->image && file_exists(public_path('uploads/products/small/' . $product->image))) {
                @unlink(public_path('uploads/products/small/' . $product->image));
            }
        } else {
            // ✅ Retain old image if new one isn't uploaded
            $data['image'] = $product->image;
        }

        // ✅ Always call update() outside the image condition
        $product->update($data);

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ]);
        }

        // Delete associated image files if they exist
        if ($product->image) {
            $largePath = public_path("uploads/products/large/{$product->image}");
            $smallPath = public_path("uploads/products/small/{$product->image}");

            if (file_exists($largePath)) {
                unlink($largePath);
            }

            if (file_exists($smallPath)) {
                unlink($smallPath);
            }
        }

        // Optional: Delete additional gallery images if stored separately in a relation

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product and its images deleted successfully',
        ]);
    }



    public function featured()
    {
        $products = Product::where('is_featured', 'yes')->latest()->take(8)->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
        ]);
    }

    public function shop(Request $request)
    {
        $query = Product::query();

        if ($request->filled('brand')) {
            $query->whereIn('brand_id', $request->brand);
        }

        if ($request->filled('category')) {
            $query->whereIn('category_id', $request->category);
        }

        $products = $query->where('status', 1)->latest()->get();

        return response()->json([
            'status' => 200,
            'data' => $products,
        ]);
    }

    public function latest()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $products
        ]);
    }
}
