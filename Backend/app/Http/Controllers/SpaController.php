<?php namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

/**
 * This controller is used to serve the JavaScript application.
 * Class SpaController
 * @package App\Http\Controllers
 */
class SpaController extends Controller {
  public function serve() {
    $currentUser = Auth::user();
    if ($currentUser) {
      $currentUser = (new UserResource($currentUser))->toArray(request());
    }
    return view('app', ['currentUser' => $currentUser]);
  }
}