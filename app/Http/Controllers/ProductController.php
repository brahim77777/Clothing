<?php

// namespace App\Http\Controllers;

// use App\Http\Resources\ProductResource;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;
// use Inertia\Inertia;

// class ProductController extends Controller
// {
//     public function index()
//     {
//         $products = Product::orderBy("rating", "desc")->with("category")->get();
//         return Inertia::render("ViewAll", ["products" => ProductResource::collection($products)]);
//     }



//     public function show(Request $request)
//     {
//         // dd($request->slug);
//         $product = Product::where('slug', '=', $request->slug, 'and', 'quantity', '>', '0')->with('reviews', 'category')->first();
//         if (!$product) {
//             abort(404);
//         }

//         // dd($product->id);
//         return Inertia::render("ProductDetails", ["product" => $product]);
//     }

//     public function destroy(Product $product)
//     {
//         $product->delete();
//         return Response::json(["success" => true, "products" => ProductResource::collection(Product::paginate(10))]);
//     }
// }

// namespace App\Http\Controllers;

// use App\Http\Resources\ProductResource;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Response;
// use Inertia\Inertia;

// class ProductController extends Controller
// {
//     public function index()
//     {
//         $products = Product::orderBy("rating", "desc")->with("category")->paginate(20); // Use pagination for API
//         return response()->json([
//             'products' => ProductResource::collection($products),
//             'last_page' => $products->lastPage(),
//             'current_page' => $products->currentPage(),
//         ]);
//     }

//     public function show(Request $request)
//     {
//         $product = Product::where('slug', $request->slug)
//             ->where('quantity', '>', 0)
//             ->with('reviews', 'category')
//             ->first();
//         if (!$product) {
//             abort(404);
//         }

//         return Inertia::render("ProductDetails", ["product" => $product]);
//     }

//     public function destroy(Product $product)
//     {
//         $product->delete();
//         $products = Product::orderBy("rating", "desc")->with("category")->paginate(10); // Use pagination for updated list
//         return response()->json([
//             "success" => true,
//             "products" => ProductResource::collection($products),
//         ]);
//     }
// }

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // Initialize the query
        $query = Product::orderBy("rating", "desc")->with("category");

        // Apply color filters if they exist
        if ($request->has('colors') && is_array($request->colors)) {
            $query->whereIn('color', $request->colors);
        }

        // Apply size filters if they exist
        if ($request->has('sizes') && is_array($request->sizes)) {
            $query->whereIn('size', $request->sizes);
        }

        // Paginate the results
        $products = $query->paginate(20);

        return response()->json([
            'products' => ProductResource::collection($products),
            'last_page' => $products->lastPage(),
            'current_page' => $products->currentPage(),
        ]);
    }

    public function show(Request $request)
    {
        $product = Product::where('slug', $request->slug)
            ->where('quantity', '>', 0)
            ->with('reviews', 'category')
            ->first();
        if (!$product) {
            abort(404);
        }

        return Inertia::render("ProductDetails", ["product" => $product]);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        $products = Product::orderBy("rating", "desc")->with("category")->paginate(10);
        return response()->json([
            "success" => true,
            "products" => ProductResource::collection($products),
        ]);
    }
}
