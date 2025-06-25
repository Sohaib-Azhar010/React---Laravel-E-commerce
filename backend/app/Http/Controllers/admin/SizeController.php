<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Size;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 200,
            'data' => $sizes,
        ]);
    }
}
