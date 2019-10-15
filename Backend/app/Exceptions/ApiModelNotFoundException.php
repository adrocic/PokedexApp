<?php namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class ApiModelNotFoundException extends ModelNotFoundException {

  public function __construct($model, $ids = []) {
    parent::__construct();
    $this->setModel($model, $ids);
  }

}