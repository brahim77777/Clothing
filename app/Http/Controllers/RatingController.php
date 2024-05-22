<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RatingController extends Controller
{
    //
    public function store(Request $request)
    {
        return response()->json([
            "success" => true,
            "body" => $request->all()
        ]);
    }
}
