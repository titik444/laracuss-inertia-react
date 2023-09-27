<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::namespace('App\Http\Controllers\My')->group(function () {
        Route::resource('users', UserController::class)->only(['edit', 'update']);
    });

    Route::namespace('App\Http\Controllers')->group(function () {
        Route::resource('discussions', DiscussionController::class)
            ->only(['create', 'store', 'edit', 'update', 'destroy']);
        Route::post('discussions/{discussion}/like', 'LikeController@discussionLike')
            ->name('discussions.like.like');
        Route::post('discussions/{discussion}/unlike', 'LikeController@discussionUnlike')
            ->name('discussions.like.unlike');

        Route::post('discussions/{discussion}/answer', 'AnswerController@store')
            ->name('discussions.answer.store');

        Route::resource('answers', AnswerController::class)->only(['edit', 'update', 'destroy']);
        Route::post('answers/{answer}/like', 'LikeController@answerLike')->name('answers.like.like');
        Route::post('answers/{answer}/unlike', 'LikeController@answerUnlike')->name('answers.like.unlike');
    });
});

Route::namespace('App\Http\Controllers')->group(function () {
    Route::get('/', 'HomeController@index')->name('home');

    Route::resource('discussions', DiscussionController::class)->only(['index', 'show']);

    Route::get('discussions/categories/{category}', 'CategoryController@show')
        ->name('discussions.categories.show');
});

Route::namespace('App\Http\Controllers\Auth')->group(function () {
    Route::get('login', 'LoginController@show')->name('auth.login.show');
    Route::post('login', 'LoginController@login')->name('login');
    Route::post('logout', 'LoginController@logout')->name('auth.login.logout');
    Route::get('sign-up', 'SignUpController@show')->name('auth.sign-up.show');
    Route::post('sign-up', 'SignUpController@signUp')->name('auth.sign-up.sign-up');
});

Route::namespace('App\Http\Controllers\My')->group(function () {
    Route::resource('users', UserController::class)->only(['show']);
});
