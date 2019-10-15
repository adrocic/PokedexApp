<?php namespace App\Http\Controllers;

use Illuminate\Contracts\Cache\Repository;
use Illuminate\Database\DatabaseManager;

class HealthCheckController extends Controller {

  public function index(DatabaseManager $db, Repository $cache) {
    // ensure the db connection is ok
    try {
      $db->connection()->select('select 1');
    } catch (\Exception $e) {
      return response('could not connect to db', 500);
    }
    return response('ok', 200);
  }

}