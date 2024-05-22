<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Resources\ProductResource;
use App\Models\Category;
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


Route::post('/upload', function (Request $request) {
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

Route::post('/dashboard/add_product', function (Request $request) {
    $request->validate([
        'title' => 'required|string|max:255',
        'category_id' => 'required|integer|exists:categories,id',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'quantity' => 'required|integer',
        'sizes' => 'required|string',
        'colors' => 'required|string',
        'avatars' => 'required|array', // Ensure 'avatars' is an array
        'avatars.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    $product = new Product();
    $product->title = $request->title;
    $product->category_id = $request->category_id;
    $product->description = $request->description;
    $product->price = $request->price;
    $product->quantity = $request->quantity;
    $product->sizes = json_decode($request->sizes);
    $product->colors = json_decode($request->colors);
    $product->slug = Str::slug($request->title);


    if ($request->hasFile('avatars')) {
        $images = [];
        foreach ($request->file('avatars') as $image) {
            $path = $image->store('images', 'public');
            $images[] = $path;
        }
        $product->images = json_encode($images);
    }



    $product->save();

    return redirect('/dashboard/products')->with('success', 'Product created successfully!');
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


// Route::get('/dashboard', function () {
//     // Fetch all products
//     $products = Product::with(['category'])->simplePaginate(10);

//     // Pass the products data as a prop to the Inertia view
//     return Inertia::render('Dashboard', [
//         'products' => ProductResource::collection($products),
//     ]);
// })->middleware('auth')->name('dashboard');

Route::get('/dashboard', function () {
    // Fetch all products
    $products = Product::with(['category'])->paginate(10);

    // Calculate the page count
    $pageCount = ceil($products->total() / $products->perPage());

    // Pass the products data and page count as props to the Inertia view
    return Inertia::render('Dashboard', [
        'products' => ProductResource::collection($products),
        'pageCount' => $pageCount,
        'total' => $products->total(),
    ]);
})->middleware('auth')->name('dashboard');

Route::get('/dashboard/products', function () {
    // Fetch all products
    $products = Product::with(['category'])->paginate(10);

    // Calculate the page count
    $pageCount = ceil($products->total() / $products->perPage());

    // Pass the products data and page count as props to the Inertia view
    return Inertia::render('Products', [
        'products' => ProductResource::collection($products),
        'pageCount' => $pageCount,
        'total' => $products->total(),
    ]);
})->middleware('auth')->name('products');


//Users
Route::get('/users', [UserController::class, 'index'])->name('users.index');

Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');


// Route::get("/products", [ProductController::class, 'index'])->name('products');
// Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
// Route::get('/products/category/{category:title}', [CategoryController::class, 'show'])->name('category.products');
// Route::get("/trending", [ProductController::class, 'index'])->name('products');
Route::delete('/products/{product:slug}', [ProductController::class, 'destroy'])->name('products.delete');

Route::get('/dashboard/product/{product:slug}', function () {
    return Inertia::render('EditProduct');
});
Route::delete('/users/{user:email}', [UserController::class, 'destroy']);

Route::middleware(['auth'])->group(function () {
    Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/products/category/{category:title}', [CategoryController::class, 'show'])->name('category.products');
    Route::get('/view-all', function () {
        return Inertia::render("ViewAll");
    })->name('ViewAll');
});

Route::post('/categories/store', [CategoryController::class, 'store'])->name('categories.store');
// Route::get('/categories/{category:title}', [CategoryController::class, 'show'])->name('categories.delete');
Route::delete('/categories/{category:title}', [CategoryController::class, 'destroy'])->name('categories.delete');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/products', function () {
    return Inertia::render("ViewAll");
})->name('ViewAll');

// Route::get('/ProductDetails', function () {
//     return Inertia::render("ProductDetails");
// })->middleware('auth')->name('ProductDetails');

Route::get('/view_all', function () {
    return Inertia::render("ViewAll");
})->name('ViewAll');

Route::get('/dashboard/categories', function () {
    return Inertia::render("Categories");
})->middleware('auth')->name('categories');


Route::get('/dashboard/update_product', function () {
    return Inertia::render("UpdateProduct");
})->middleware('auth')->name('UpdateProduct');

Route::get('/dashboard/users', function () {
    return Inertia::render("Users");
})->middleware('auth')->name('users');

Route::get('/dashboard/add_product', function () {
    return Inertia::render("AddProduct");
})->middleware('auth')->name('AddProduct');

Route::get('/check_out', function () {
    return Inertia::render("CheckoutPage");
})->middleware('auth')->name('CheckoutPage');

Route::get('/cart', function () {
    return Inertia::render("Cart");
})->name('Cart');


Route::get('/favorite', function () {
    return Inertia::render("Favorite");
})->middleware('auth')->name('Favorite');




Route::get('tailwindui', function () {
    return Inertia::render('with_inline_actions_and_expandable_sidebar_filters');
});

// Route::get('simplex', function () {
//     return Inertia::render('Simplex_form');
// });

Route::get('/calculs', function () {

    $products = Product::all();

    return Inertia::render('Calculs', [
        'products' => ProductResource::collection($products)
    ]);
});

require __DIR__ . '/auth.php';
