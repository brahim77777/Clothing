<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Resources\ProductResource;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\TemporaryFile;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
// use App\Http\Controllers\UploadController;

use App\Models\Product;

use Illuminate\Http\Request;


Route::post('/dashboard', function (Request $request) {
    $filePaths = [];

    $request->validate([
        'avatars' => 'required|array', // Ensure 'avatars' is an array
        'avatars.*' => 'required|file|image|max:5120', // Validate each file in the array
    ]);

    foreach ($request->file('avatars') as $index => $avatar) {

        $filename = uniqid() . '_' . $index . '.' . $avatar->getClientOriginalExtension();
        $path = $avatar->storeAs('public', $filename);
        $filePaths[] = $path;

    }

    return Inertia::render('/dashboard');
});


Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => \App\Models\Category::all(),
        'products' => Product::all(),
    ]);
})->name('homepage');


Route::get('/dashboard', function () {
    // Fetch all products
    $products = Product::with(['category'])->SimplePaginate(10);

    // Pass the products data as a prop to the Inertia view
    return Inertia::render('Dashboard', [
        'products' => ProductResource::collection($products),
    ]);
})->middleware('auth')->name('dashboard');

Route::get("/products", [ProductController::class, 'index'])->name('products');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/category/{category:title}', [CategoryController::class, 'show'])->name('category.products');
Route::get("/trending", [ProductController::class, 'index'])->name('products');
Route::delete('/products/{product:slug}', [ProductController::class, 'destroy'])->name('products.delete');

// Search is in routes/api.php
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::post('/categories/store', [CategoryController::class, 'store'])->name('categories.store');
// Route::get('/categories/{category:title}', [CategoryController::class, 'show'])->name('categories.delete');
Route::delete('/categories/{category:title}', [CategoryController::class, 'destroy'])->name('categories.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Route::get('/ProductDetails', function () {
//     return Inertia::render("ProductDetails");
// })->middleware('auth')->name('ProductDetails');


Route::get('/ViewAll', function () {
    return Inertia::render("ViewAll");
})->middleware('auth')->name('ViewAll');

Route::get('/Cart', function () {
    return Inertia::render("Cart");
})->middleware('auth')->name('Cart');


Route::get('/Favorite', function () {
    return Inertia::render("Favorite");
})->middleware('auth')->name('Favorite');


Route::get('tailwindui', function () {
    return Inertia::render('with_inline_actions_and_expandable_sidebar_filters');
});


require __DIR__ . '/auth.php';
