<?php

namespace App\Http\Controllers\admin;
use App\Models\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class BrandController extends Controller
{
     public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $brand = Brand::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);



        return response()->json([
            'status' => 200,
            'message' => 'Brand created successfully',
            'data' => $brand,
        ]);
    }


    public function show($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand,
        ]);
    }


    public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'status' => 'required|in:0,1',
    ]);

    $brand = Brand::find($id);

    if (!$brand) {
        return response()->json([
            'status' => 404,
            'message' => 'Brand not found',
        ]);
    }

    $brand->name = $request->name;
    $brand->status = (int) $request->status; // Force to integer

    $brand->save();

    return response()->json([
        'status' => 200,
        'message' => 'Brand updated successfully',
    ]);
}



    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
            ]);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brand deleted successfully',
        ]);
    }
}
