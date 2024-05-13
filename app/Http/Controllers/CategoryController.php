<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function show(Category $category)
    {
        $products = $category->products()->with("category")->get();
        return Inertia::render("ViewAll", ["products" => ProductResource::collection($products)]);
    }


}
