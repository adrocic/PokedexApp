<?php namespace App\Exceptions;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\MessageProvider;

class ApiValidationException extends ApiException implements Jsonable, Arrayable {

  public function __construct(MessageProvider $validator, $message, \Exception $previous = null) {
    $this->setMessageProvider($validator);
    parent::__construct(422, 'VALIDATION_ERROR', $message, $previous);
  }

}