<?php

use App\Http\Controllers\CommandController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\SimplexController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/search/{query}', function ($query) {
    return \App\Http\Controllers\SearchController::search($query);
});

use App\Http\Controllers\ProductController;

Route::get('/products', [ProductController::class, 'index'])->name('api.products');
Route::get('/products/newest', [ProductController::class, 'newest'])->name('api.products.newest');
Route::get('/products/bestsellers', [ProductController::class, 'bestseller'])->name('api.products.bestseller');
Route::post('/simplex', [SimplexController::class, 'simplex'])->name('api.simplex');
// Route::post('/products', function (Request $request) {
//     return response()->json(['success' => $request->all()]);
// });


Route::post('/products', [ProductController::class, 'store'])->name('api.products.store');
Route::post('/command', function (Request $request) {
    $request->validate([
        'address' => 'required',
        'city' => 'required',
        'cin' => 'required',
        'phone' => 'required',
        'email' => 'required|email',
        'products_ids' => 'required',
        'total' => 'required',
        "company_name" => "nullable",
        'shippingMethod' => "required"
    ]);
})->name('api.products.command');

Route::patch('/command/{command}', [CommandController::class, 'update'])->name('api.products.rating');
