<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SliderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $path = public_path('index.html');
    if (file_exists($path)) {
        return file_get_contents($path);
    }
    return redirect('/admin');
});

Route::get('/destinasi/{any}', function ($any) {
    if (str_ends_with($any, '__PAGE__.txt')) {
        if (preg_match('/__next\.destinasi\.(.+)\.__PAGE__\.txt$/', $any, $matches)) {
            $slug = $matches[1];
            $path = public_path("destinasi/__next.destinasi/{$slug}/__PAGE__.txt");
            if (file_exists($path)) {
                return response()->file($path, ['Content-Type' => 'text/plain']);
            }
        }
        if (str_contains($any, '__next.destinasi.__PAGE__.txt')) {
            $path = public_path('destinasi/__next.destinasi/__PAGE__.txt');
            if (file_exists($path)) {
                return response()->file($path, ['Content-Type' => 'text/plain']);
            }
        }
    }
    abort(404);
})->where('any', '.*__PAGE__\.txt$');

Route::get('/berita/{any}', function ($any) {
    if (str_ends_with($any, '__PAGE__.txt')) {
        if (preg_match('/__next\.berita\.(.+)\.__PAGE__\.txt$/', $any, $matches)) {
            $slug = $matches[1];
            $path = public_path("berita/__next.berita/{$slug}/__PAGE__.txt");
            if (file_exists($path)) {
                return response()->file($path, ['Content-Type' => 'text/plain']);
            }
        }
        if (str_contains($any, '__next.berita.__PAGE__.txt')) {
            $path = public_path('berita/__next.berita/__PAGE__.txt');
            if (file_exists($path)) {
                return response()->file($path, ['Content-Type' => 'text/plain']);
            }
        }
    }
    abort(404);
})->where('any', '.*__PAGE__\.txt$');

Route::get('/destinasi', function () {
    $path = request()->getPathInfo();
    if (!str_ends_with($path, '/')) {
        return redirect($path . '/' . (request()->getQueryString() ? '?' . request()->getQueryString() : ''), 301);
    }

    $pathDir = public_path('destinasi/index.html');
    if (file_exists($pathDir)) {
        return file_get_contents($pathDir);
    }
    abort(404);
});

Route::get('/destinasi/{slug}', function ($slug) {
    $path = request()->getPathInfo();
    if (!str_ends_with($path, '/')) {
        return redirect($path . '/' . (request()->getQueryString() ? '?' . request()->getQueryString() : ''), 301);
    }

    $pathDir = public_path("destinasi/{$slug}/index.html");
    if (file_exists($pathDir)) {
        return file_get_contents($pathDir);
    }
    abort(404);
})->where('slug', '[a-zA-Z0-9_-]+');

Route::get('/berita', function () {
    $path = request()->getPathInfo();
    if (!str_ends_with($path, '/')) {
        return redirect($path . '/' . (request()->getQueryString() ? '?' . request()->getQueryString() : ''), 301);
    }

    $pathDir = public_path('berita/index.html');
    if (file_exists($pathDir)) {
        return file_get_contents($pathDir);
    }
    abort(404);
});

Route::get('/berita/{slug}', function ($slug) {
    $path = request()->getPathInfo();
    if (!str_ends_with($path, '/')) {
        return redirect($path . '/' . (request()->getQueryString() ? '?' . request()->getQueryString() : ''), 301);
    }

    $pathDir = public_path("berita/{$slug}/index.html");
    if (file_exists($pathDir)) {
        return file_get_contents($pathDir);
    }
    abort(404);
})->where('slug', '[a-zA-Z0-9_-]+');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('sliders', SliderController::class)->except(['show', 'edit', 'update']);
});
