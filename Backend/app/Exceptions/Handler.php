<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler {

  /**
   * A list of the exception types that are not reported.
   *
   * @var array
   */
  protected $dontReport = [
    ApiBadRequestException::class,
    ApiAuthenticationException::class,
    ApiAuthorizationException::class,
    ApiModelNotFoundException::class,
    ApiValidationException::class,
    JustValidatedException::class
  ];

  /**
   * A list of the inputs that are never flashed for validation exceptions.
   *
   * @var array
   */
  protected $dontFlash = [
    'password',
    'password_confirmation',
  ];

  /**
   * Report or log an exception.
   *
   * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
   *
   * @param  \Exception $exception
   * @return void
   */
  public function report(Exception $exception) {
    if ($this->shouldReport($exception) && \Rollbar\Rollbar::logger()) {
      \Rollbar\Rollbar::logger()->error($exception);
    }
    parent::report($exception);
  }

  /**
   * Transform an exception to the application's api equivalent
   *
   * @param Exception $e
   * @return ApiException
   */
  private function tranformToApiException(Exception $e) {
    switch (true) {
      case $e instanceof ApiException:
        return $e;
      case $e instanceof AuthenticationException:
        return new ApiAuthenticationException($e->getMessage(), $e);
      case $e instanceof AuthorizationException:
        return new ApiAuthorizationException($e->getMessage(), $e);
      case $e instanceof ValidationException:
        return new ApiValidationException($e->validator, $e->getMessage(), $e);
      case $e instanceof ModelNotFoundException:
        return new ApiException(404, 'MODEL_NOT_FOUND', $e->getMessage(), $e);
      case $e instanceof HttpException:
        return new ApiException($e->getStatusCode(), null, $e->getMessage(), $e, $e->getHeaders(), $e->getCode());
      default:
        return new ApiBadRequestException($e->getMessage(), $e);
    }
  }

  /**
   * Render an exception into an HTTP response.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Exception $exception
   * @return \Symfony\Component\HttpFoundation\Response
   */
  public function render($request, Exception $exception) {
    if ($request->wantsJson() || $request->isJson() || starts_with($request->path(), 'api/')) {
      $e = $this->tranformToApiException($exception);
      return new JsonResponse(['error' => $e->toArray()], $e->getStatusCode(), $e->getHeaders());
    }
    if ($exception instanceof AuthorizationException) {
      return $this->unauthorized($request, $exception);
    }
    return parent::render($request, $exception);
  }

  /**
   * Convert an authentication exception into a response.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Illuminate\Auth\AuthenticationException $exception
   * @return \Illuminate\Http\Response
   */
  protected function unauthenticated($request, AuthenticationException $exception) {
    return redirect()->guest(route('login'));
  }

  /**
   * Convert an authorization exception into a response.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Illuminate\Auth\Access\AuthorizationException $exception
   * @return \Illuminate\Http\Response
   */
  protected function unauthorized($request, AuthorizationException $exception) {
    return redirect()->back()->with('error', 'Unauthorized');
  }

}
