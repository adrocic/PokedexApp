<?php

if (!function_exists('isApiRequest')) {
  function isApiRequest () {
    return 1 === preg_match('|^api/.*|', request()->path());
  }
}

if (!function_exists('container_name')) {
  /**
   * Returns the name of the container the app is running in.
   * Read from the CONTAINER_NAME or DEIS_APP environment variables.
   *
   * @return string The name of the container. default: laravel
   */
  function container_name() {
    if (getenv('CONTAINER_NAME') !== false) {
      return getenv('CONTAINER_NAME');
    }
    if (getenv('DEIS_APP') !== false) {
      return getenv('DEIS_APP');
    }

    return 'laravel';
  }
}

if (!function_exists('container_type')) {
  /**
   * Returns the type of container the app is running in.
   * Read from the CONTAINER_TYPE or WORKFLOW_RELEASE environment variables.
   *
   * @return string The type of container. default: unknown
   */
  function container_type() {
    if (getenv('CONTAINER_TYPE') !== false) {
      return getenv('CONTAINER_TYPE');
    }
    if (getenv('DEIS_APP') !== false) {
      return 'deis';
    }

    return 'unknown';
  }
}

if (!function_exists('container_version')) {
  /**
   * Returns the version of the container.
   * Read from the CONTAINER_VERSION or WORKFLOW_RELEASE environment variables.
   *
   * @return string The container version. default: unknown
   */
  function container_version() {
    if (getenv('CONTAINER_VERSION') !== false) {
      return getenv('CONTAINER_VERSION');
    }
    if (getenv('WORKFLOW_RELEASE') !== false) {
      return getenv('WORKFLOW_RELEASE');
    }

    return 'unknown';
  }
}

if (!function_exists('git_sha')) {
  /**
   * Returns the git sha of the code used to build the container.
   * Read from the SOURCE_VERSION environment variable.
   *
   * @return string
   */
  function git_sha() {
    if (getenv('SOURCE_VERSION') !== false) {
      return getenv('SOURCE_VERSION');
    }

    return 'unknown';
  }
}