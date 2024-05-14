<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function index()
    {
        return Response::json(['categories' => Category::all()]);
    }
    public function show(Category $category)
    {
        $products = $category->products()->with("category")->get();
        return Inertia::render("ViewAll", ["products" => ProductResource::collection($products)]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate(['title' => 'required|min:2|max:255|unique:categories,title']);
            $title = $request->title;
            Category::create(["title" => $title]);
            return Response::json(["success" => true]);

        } catch (\Exception $e) {
            // return Response::json(["error" => "Invalid Format , category should be unique and at least 2 characters long"], 422);
            $failedRule = $e->validator->failed();
            $failedRuleKey = array_key_first($failedRule);
            $failedRuleName = $e->validator->getMessageBag()->get($failedRuleKey)[0];

            return Response::json([
                "error" => "The {$failedRuleName} rule is not validated",
            ], 422);
        }
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return Response::json(["success" => true]);
    }


}
