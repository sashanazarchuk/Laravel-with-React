<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// добавив маршрут products по маршруту передаю клас ProductController і метод index
Route::get('/products', [ProductController::class, 'index']);
Route::delete('/delete/{id}', [ProductController::class, 'destroy']);
Route::post('/add/{n}/{d}', [ProductController::class, 'store']);
Route::post('/products', [ProductController::class, 'store']);

