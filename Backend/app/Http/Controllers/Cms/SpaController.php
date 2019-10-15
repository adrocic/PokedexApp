<?php namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;

/**
 * This controller is used to serve the JavaScript application.
 * Class SpaController
 * @package App\Http\Controllers
 */
class SpaController extends Controller {
  public function serve() {
    return view('cms');
  }
}
