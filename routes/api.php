<?php

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
