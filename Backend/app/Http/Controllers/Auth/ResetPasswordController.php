<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\ApiBadRequestException;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use function isApiRequest;

class ResetPasswordController extends Controller {

  /*
  |--------------------------------------------------------------------------
  | Password Reset Controller
  |--------------------------------------------------------------------------
  |
  | This controller is responsible for handling password reset requests
  | and uses a simple trait to include this behavior. You're free to
  | explore this trait and override any methods you wish to tweak.
  |
  */

  use ResetsPasswords {
    sendResetResponse as parentSendResetResponse;
    sendResetFailedResponse as parentSendResetFailedResponse;
  }

  /**
   * Where to redirect users after resetting their password.
   *
   * @var string
   */
  protected $redirectTo = '/home';


  protected function sendResetResponse($response) {
    if (isApiRequest()) {
      return response(trans($response));
    }

    return $this->parentSendResetResponse($response);
  }

  protected function sendResetFailedResponse(Request $request, $response) {
    if (isApiRequest()) {
      throw new ApiBadRequestException(trans($response));
    }

    return $this->parentSendResetFailedResponse($request, $response);
  }
}
