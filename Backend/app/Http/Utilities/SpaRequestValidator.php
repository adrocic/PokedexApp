<?php namespace App\Http\Utilities;

use App\Http\Controllers\SpaController;
use Illuminate\Routing\Matching\ValidatorInterface;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;

/**
 * Used to help prevent erroneous route matches. It ensures that a request which matches the catch-all
 * JavaScript serving route in routes/web.php must also be expecting a response type of text/html. This means that
 * requests for non-existent assets and API routes will still see a standard 404 response.
 *
 * Class SpaRequestValidator
 * @package App\Http
 */
class SpaRequestValidator implements ValidatorInterface {

  /**
   * Serves the
   *
   * @param  \Illuminate\Routing\Route $route
   * @param  \Illuminate\Http\Request $request
   * @return bool
   */
  public function matches(Route $route, Request $request) {
    $isAppRoute = is_string($route->action['uses']) && $route->getController() instanceof SpaController;

    if ($isAppRoute) {
      return $request->acceptsHtml() && !$request->isXmlHttpRequest();
    }

    return true;
  }
}