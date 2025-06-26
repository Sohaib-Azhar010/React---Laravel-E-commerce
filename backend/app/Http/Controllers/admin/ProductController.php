<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $product,
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|integer',
            'sku' => 'required|string',
            'status' => 'required|integer',
            'is_featured' => 'required|in:yes,no',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        }

        $data = $request->all();


        $product = Product::create($data);


        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImg = TempImage::find($tempImageId);

                if (!$tempImg) continue;

                // Determine extension
                $extArray = explode('.', $tempImg->name);
                $ext = end($extArray);
                $imageName = $product->id . '.' . $ext;

                $manager = new ImageManager(new Driver());

                // Large image
                $img = $manager->read(public_path("uploads/temp/{$tempImg->name}"));
                $img->scaleDown(1200);
                $img->save(public_path("uploads/products/large/{$imageName}"));

                // Small thumb
                $img = $manager->read(public_path("uploads/temp/{$tempImg->name}"));
                $img->coverDown(400, 460);
                $img->save(public_path("uploads/products/small/{$imageName}"));

                if ($key === 0) {
                    $product->image = $imageName;
                    $product->save();
                }
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




    // DELETE /products/{id}
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ]);
        }

        $product->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully',
        ]);
    }
}
