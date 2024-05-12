<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\TemporaryFile;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Http\Request;





Route::post('/dashboard', function (Request $request) {
    // Initialize an array to store the file paths
    $filePaths = [];

<<<<<<< Updated upstream
Route::post('/dashboard', function (Request $request) {
    // Initialize an array to store the file paths
    $filePaths = [];

    // Validate the request data
    $request->validate([
        'avatars' => 'required|array', // Ensure 'avatars' is an array
        'avatars.*' => 'required|file|image|max:1024', // Validate each file in the array
    ]);

    foreach ($request->file('avatars') as $index => $avatar) {
        // Check if the file name contains "_"
        if (strpos($avatar->getClientOriginalName(), '_') !== false) {
            // Handle edited image (uploaded as a new file)
            // Store the edited image
            $filename = uniqid() . '_' . $index . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('public', $filename);
            $filePaths[] = $path;
        } else {
            // Handle regular file upload
            // Store the uploaded avatars
            $filename = uniqid() . '_' . $index . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('public', $filename);
            $filePaths[] = $path;
        }
    }

=======
    // Validate the request data
    $request->validate([
        'avatars' => 'required|array', // Ensure 'avatars' is an array
        'avatars.*' => 'required|file|image|max:1024', // Validate each file in the array
    ]);

    foreach ($request->file('avatars') as $index => $avatar) {
        // Check if the file name contains "_"
        if (strpos($avatar->getClientOriginalName(), '_') !== false) {
            // Handle edited image (uploaded as a new file)
            // Store the edited image
            $filename = uniqid() . '_' . $index . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('public', $filename);
            $filePaths[] = $path;
        } else {
            // Handle regular file upload
            // Store the uploaded avatars
            $filename = uniqid() . '_' . $index . '.' . $avatar->getClientOriginalExtension();
            $path = $avatar->storeAs('public', $filename);
            $filePaths[] = $path;
        }
    }

>>>>>>> Stashed changes
    return Inertia::render('/dashboard');
});


Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'categories' => \App\Models\Category::all(),
        'products' => \App\Models\Product::all(),
    ]);
})->name('homepage');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/products/{slug}', function ($slug) {
    $product = \App\Models\Product::where('slug', $slug)->with('reviews')->with('category')->first();
    return Inertia::render("ProductDetails", ["product" => $product]);
});


Route::get('/ProductDetails', function () {
    return Inertia::render("ProductDetails");
})->middleware('auth')->name('ProductDetails');


Route::get('/ViewAll', function () {
    return Inertia::render("ViewAll");
})->middleware('auth')->name('ViewAll');

Route::get('/Cart', function () {
    return Inertia::render("Cart");
})->middleware('auth')->name('Cart');


Route::get('/Favorite', function () {
    return Inertia::render("Favorite");
})->middleware('auth')->name('Favorite');





require __DIR__ . '/auth.php';
