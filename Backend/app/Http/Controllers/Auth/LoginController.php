<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use function isApiRequest;

class LoginController extends Controller {

  use AuthenticatesUsers {
    sendLoginResponse as parentSendLoginResponse;
    logout as parentLogout;
  }

  protected function sendLoginResponse(Request $request) {
    if (isApiRequest()) {
      return new UserResource(Auth::user());
    }

    return $this->parentSendLoginResponse($request);
  }

  protected function attemptLogin(Request $request)
  {
    return $this->guard()->attempt(
      $this->credentials($request), $request->get('remember')
    );
  }

  public function logout(Request $request) {
    if (isApiRequest()) {
      Auth::logout();
      return response()->json();
    }
    return $this->parentLogout($request);
  }
}
