<?php

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

Route::group(['as' => 'api.spa.', 'prefix' => 'api/spa'], function () {

  Route::group(['namespace' => 'Cms', 'as' => 'cms.', 'prefix' => 'cms'], function () {
  });

  Route::group(['namespace' => 'Auth', 'as' => 'auth.', 'prefix' => 'auth'], function () {
    Route::post('login', 'LoginController@login');
    Route::post('logout', 'LoginController@logout');
    Route::post('register', 'RegisterController@register');
    Route::post('reset-password', 'ResetPasswordController@reset');
    Route::post('forgot-password', 'ForgotPasswordController@sendResetLinkEmail');
  });

});

/*
| This route serves the JavaScript application from all routes that do not
| match a previously defined route. This approach allows us to manage the URL
| client-side while serving our JavaScript app from the same domain.
| The JavaScript application is responsible for determining whether or not
| the given URL matches a page in the UI and displaying a 404 page if necessary.
*/
Route::group(['namespace' => 'Cms', 'as' => 'cms.', 'prefix' => 'cms'], function () {
  Route::get('{any}', 'SpaController@serve')->where('any', '.*');
});
Route::get('{_}', 'SpaController@serve')->where('_', '^(?!(api/|build/|docs/)).*');
