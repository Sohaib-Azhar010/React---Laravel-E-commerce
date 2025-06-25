<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories,
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

        $category = Category::create([
            'name' => $request->name,
            'status' => $request->status,
        ]);



        return response()->json([
            'status' => 200,
            'message' => 'Category created successfully',
            'data' => $category,
        ]);
    }


    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $category,
        ]);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 422, 'errors' => $validator->errors()]);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['status' => 404, 'message' => 'Category not found']);
        }

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json(['status' => 200, 'message' => 'Category updated successfully']);
    }



    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
            ]);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully',
        ]);
    }
}
