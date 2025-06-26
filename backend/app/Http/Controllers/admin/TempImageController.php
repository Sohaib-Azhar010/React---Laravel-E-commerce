<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

class TempImageController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        }

        $image = $request->file("image");
        $imageName = time() . "." . $image->extension();

        $uploadPath = public_path("uploads/temp");
        $thumbPath = public_path("uploads/temp/thumb");

        // Create directories if not exist
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true);
        }
        if (!File::exists($thumbPath)) {
            File::makeDirectory($thumbPath, 0755, true);
        }

        // Move original image
        $image->move($uploadPath, $imageName);

        // Save thumbnail using Intervention Image
        $manager = new ImageManager(new Driver());
        $img = $manager->read($uploadPath . '/' . $imageName);
        $img->coverDown(400, 450);
        $img->save($thumbPath . '/' . $imageName);

        // Save to DB
        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        return response()->json([
            'status' => 200,
            'message' => 'Image has been uploaded',
            'data' => $tempImage,
        ]);
    }
}
