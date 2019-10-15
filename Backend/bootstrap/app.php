<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = new Illuminate\Foundation\Application(
  realpath(__DIR__ . '/../')
);

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
  Illuminate\Contracts\Http\Kernel::class,
  App\Http\Kernel::class
);

$app->singleton(
  Illuminate\Contracts\Console\Kernel::class,
  App\Console\Kernel::class
);

$app->singleton(
  Illuminate\Contracts\Debug\ExceptionHandler::class,
  App\Exceptions\Handler::class
);

/*
|--------------------------------------------------------------------------
| Setup Rollbar Logging
|--------------------------------------------------------------------------
*/

$app->afterBootstrapping(\Illuminate\Foundation\Bootstrap\LoadConfiguration::class, function () use ($app) {
  $rbToken = config('services.rollbar.access_token');
  if (!empty($rbToken)) {
    \Rollbar\Rollbar::init([
      'access_token' => $rbToken,
      'allow_exec' => false,
      'batched' => true,
      'code_version' => container_version() . '-' . git_sha(),
      'environment' => config('services.rollbar.environment', config('app.env')),
      'framework' => 'Laravel ' . $app::VERSION,
      'person_fn' => function () {
        $auth = app(Illuminate\Contracts\Auth\Guard::class);
        $user = $auth->user();
        $person = [];
        if (!empty($user)) {
          $person['id'] = $user->getAuthIdentifier();
        }
        return $person;
      },
      'root' => base_path(),
    ], false, false, false);
  }
});

/*
|--------------------------------------------------------------------------
| Setup Logging to Logstash
|--------------------------------------------------------------------------
*/

$app->afterBootstrapping(\Illuminate\Foundation\Bootstrap\LoadConfiguration::class, function () use ($app) {
  $uri = config('services.logstash.uri');
  if (!empty($uri)) {
    $app->configureMonologUsing(function ($monolog) use ($uri) {
      $handler = new \Monolog\Handler\SocketHandler($uri);
      $handler->setConnectionTimeout(config('services.logstash.timeout', 5));
      $handler->setPersistent(config('services.logstash.persistent', true));
      $handler->setFormatter(new \Monolog\Formatter\LogstashFormatter(container_name(), null, null, 'ctxt_',
        \Monolog\Formatter\LogstashFormatter::V1));
      $monolog->pushHandler($handler);
    });
  }
});

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
