<?php

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
|
| Deis can check a health-check route to ensure an app is available before
| it becomes published. To make use of this feature, create a liveness
| health check:
|
|   deis healthchecks:set liveness httpGet --type=cmd --path=/health-check
|
| Additionally, this endpoint can be used by StatusCake. If you use a
| database connection or other external connections, you can try to
| obtain a connection here to try further test health.
|
*/

Route::get('/health-check', 'HealthCheckController@index');