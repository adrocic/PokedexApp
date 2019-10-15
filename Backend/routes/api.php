<?php

use Illuminate\Http\Request;
use App\Http\Controllers;

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

Route::group(['as' => 'v1.', 'prefix' => 'v1'], function () {


  Route::group(['namespace' => 'Auth', 'as' => 'auth.', 'prefix' => 'auth'], function () {
    Route::post('login', 'LoginController@login');
    Route::post('logout', 'LoginController@logout');
    Route::post('register', 'RegisterController@register');
    Route::post('reset-password', 'ResetPasswordController@reset');
    Route::post('forgot-password', 'ForgotPasswordController@sendResetLinkEmail');
  });

  Route::get('pokemon', 'PokemonController@index');
  Route::get('pokemon/captured', 'PokemonController@captured');
  Route::get('pokemon/{id}', 'PokemonController@show');
  Route::patch('pokemon/{id}', 'PokemonController@capture');

  Route::group(['middleware' => ['auth']], function () {
    Route::get('/users/me', function (Request $request) {
      return $request->user();
    });
  });
});
