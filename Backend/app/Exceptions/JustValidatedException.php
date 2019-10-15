<?php namespace App\Exceptions;

class JustValidatedException extends ApiException {
  public function __construct() {
    parent::__construct(200, null, '');
  }
}