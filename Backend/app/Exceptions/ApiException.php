<?php namespace App\Exceptions;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Contracts\Support\MessageProvider;
use Illuminate\Http\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiException extends HttpException implements Jsonable, Arrayable {

  /**
   * @var string|null
   */
  protected $codeSlug;

  /**
   * @var array|null
   */
  protected $more;

  /**
   * @var MessageProvider|null
   */
  private $messageProvider;

  public function __construct($statusCode, $codeSlug, $message, \Exception $previous = null, array $headers = [], $code = 0) {
    $this->codeSlug = $codeSlug;

    parent::__construct($statusCode, $message, $previous, $headers, $code);
  }

  /**
   * @return null|string
   */
  public function getCodeSlug() {
    return $this->codeSlug;
  }

  /**
   * @param string $code
   */
  public function setCodeSlug($code) {
    $this->codeSlug = $code;
  }

  /**
   * @param array $more
   */
  public function setMore(array $more) {
    $this->more = $more;
  }

  /**
   * @return array|null
   */
  public function getMore() {
    return $this->more;
  }

  /**
   * @param MessageProvider $messageProvider
   */
  public function setMessageProvider(MessageProvider $messageProvider) {
    $this->messageProvider = $messageProvider;
  }

  /**
   * @return MessageProvider|null
   */
  public function getMessageProvider() {
    return $this->messageProvider;
  }

  /**
   * Convert the object to its JSON representation.
   *
   * @param  int $options
   * @return string
   */
  public function toJson($options = 0) {
    return json_encode($this->toArray(), $options);
  }

  /**
   * Get the instance as an array.
   *
   * @return array
   */
  public function toArray() {
    $code = $this->getCodeSlug() ?: strtoupper(snake_case(array_get(Response::$statusTexts, (int)$this->getStatusCode(), "bad request")));

    $array = [
      'code' => $code,
      'message' => empty($this->getMessage()) ? $code : $this->getMessage(),
    ];
    if ($this->getMore()) {
      $array['more'] = $this->getMore();
    }
    if ($this->getMessageProvider()) {
      $array['validation_messages'] = $this->getMessageProvider()->getMessageBag()->toArray();
    }
    if (config('app.debug')) {
      $e = $this->getPrevious() ?: $this;
      $array['trace'] = $e->getTrace();
    }
    return $array;
  }

}