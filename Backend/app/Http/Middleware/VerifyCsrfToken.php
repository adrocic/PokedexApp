<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends Middleware {

  /**
   * The URIs that should be excluded from CSRF verification.
   *
   * @var array
   */
  protected $except = [
    //
  ];


  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @return mixed
   *
   * @throws \Illuminate\Session\TokenMismatchException
   */
  public function handle($request, Closure $next) {
    try{
      return parent::handle($request, $next);
    } catch (TokenMismatchException $e) {
      // If the X-Request-With header has been added, we know that the request comes
      // from our app or a domain allowed by our CORS configuration, so we can allow
      // the request
      if ( $request->isXmlHttpRequest()) {
        return $this->addCookieToResponse($request, $next($request));
      }

      throw new TokenMismatchException;
    }
  }
}
