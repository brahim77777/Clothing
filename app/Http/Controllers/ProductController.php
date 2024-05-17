<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy("rating", "desc")->with("category")->paginate(10);

        return Response::json([
            "products" =>  $products->items(),
            "total" => $products->total(),
            "per_page" => $products->perPage(),
            "current_page" => $products->currentPage(),
            "last_page" => $products->lastPage(),
            "next_page_url" => $products->nextPageUrl(),
            "prev_page_url" => $products->previousPageUrl()
        ]);


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
