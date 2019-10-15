<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\ApiBadRequestException;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use function isApiRequest;

class ForgotPasswordController extends Controller {

  /*
  |--------------------------------------------------------------------------
  | Password Reset Controller
  |--------------------------------------------------------------------------
  |
  | This controller is responsible for handling password reset emails and
  | includes a trait which assists in sending these notifications from
  | your application to your users. Feel free to explore this trait.
  |
  */

  use SendsPasswordResetEmails {
    sendResetLinkFailedResponse as parentSendResetLinkFailedResponse;
    sendResetLinkResponse as parentSendResetLinkResponse;
  }

  protected function sendResetLinkResponse($response) {
    if (isApiRequest()) {
      return response()->json(trans($response));
    }
    return $this->parentSendResetLinkResponse($response);
  }

  protected function sendResetLinkFailedResponse(Request $request, $response) {
    if (isApiRequest()) {
      throw new ApiBadRequestException(trans($response));
    }

    return $this->parentSendResetLinkFailedResponse($request, $response);
  }
}
