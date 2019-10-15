<?php namespace App\Http\Requests;

use App\Exceptions\JustValidatedException;
use function array_key_exists;

trait CanJustValidate {
  /**
   * Validate the class instance.
   *
   * @return void
   */
  public function validate()
  {
    $this->prepareForValidation();

    $instance = $this->getValidatorInstance();

    if (! $this->passesAuthorization()) {
      $this->failedAuthorization();
    } elseif (! $instance->passes()) {
      $this->failedValidation($instance);
    } elseif ($this->isJustValidating()) {
      throw new JustValidatedException;
    }
  }

  /**
   * Configure the validator instance.
   *
   * @param  \Illuminate\Validation\Validator  $validator
   * @return void
   */
  public function withValidator($validator) {
    if ($this->isJustValidating()) {
      $ruleKeys = array_keys($validator->getRules());
      $sometimesed = [];
      foreach ($ruleKeys as $key) {
        $sometimesed[$key] = 'sometimes';
      }
      $validator->addRules($sometimesed);
    }
  }

  private function isJustValidating () {
     return array_key_exists('VALIDATE_ONLY', $this->validationData());
  }
}