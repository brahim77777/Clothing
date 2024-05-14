<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::orderBy("rating", "desc")->with("category")->get();
        return Inertia::render("ViewAll", ["products" => ProductResource::collection($products)]);
    }

    public function show(Request $request)
    {
        // dd($request->slug);
        $product = Product::where('slug', '=', $request->slug, 'and', 'quantity', '>', '0')->with('reviews', 'category')->first();
        if (!$product) {
            abort(404);
        }

        // dd($product->id);
        return Inertia::render("ProductDetails", ["product" => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Response::json(["success" => true, "products" => ProductResource::collection(Product::paginate(10))]);
    }
}
