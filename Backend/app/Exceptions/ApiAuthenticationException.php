<?php namespace App\Exceptions;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

class ApiAuthenticationException extends ApiException implements Jsonable, Arrayable {

  public function __construct($message, \Exception $previous = null) {
    parent::__construct(401, null, $message, $previous);
  }

}