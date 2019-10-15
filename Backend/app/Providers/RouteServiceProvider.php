<?php

namespace App\Providers;

use App\Http\Utilities\SpaRequestValidator;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Routing\Route as RouteClass;
use Illuminate\Support\Facades\Route;
use function array_merge;

class RouteServiceProvider extends ServiceProvider {

  /**
   * This namespace is applied to your controller routes.
   *
   * In addition, it is set as the URL generator's root namespace.
   *
   * @var string
   */
  protected $namespace = 'App\Http\Controllers';

  /**
   * Define your route model bindings, pattern filters, etc.
   *
   * @return void
   */
  public function boot() {
    //

    parent::boot();

    RouteClass::$validators = array_merge([new SpaRequestValidator], RouteClass::getValidators());
  }

  /**
   * Define the routes for the application.
   *
   * @return void
   */
  public function map() {
    $this->mapApiRoutes();

    $this->mapWebRoutes();

    $this->mapMetaRoutes();
  }

  /**
   * Define the "web" routes for the application.
   *
   * These routes all receive session state, CSRF protection, etc.
   *
   * @return void
   */
  protected function mapWebRoutes() {
    Route::middleware('web')
      ->namespace($this->namespace)
      ->group(base_path('routes/web.php'));
  }

  /**
   * Define the "api" routes for the application.
   *
   * These routes are typically stateless.
   *
   * @return void
   */
  protected function mapApiRoutes() {
    Route::prefix('api')
      ->as('api.')
      ->middleware('api')
      ->namespace($this->namespace)
      ->group(base_path('routes/api.php'));
  }

  /**
   * Define the "meta" routes for the application. Useful
   * for health/status checks.
   *
   * @return void
   */
  protected function mapMetaRoutes() {
    Route::namespace($this->namespace)
      ->group(base_path('routes/meta.php'));
  }
}
