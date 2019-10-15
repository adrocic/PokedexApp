<?php namespace App\Exceptions;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

class ApiBadRequestException extends ApiException implements Jsonable, Arrayable {

  public function __construct($message, \Exception $previous = null) {
    parent::__construct(400, null, $message, $previous);
  }

}