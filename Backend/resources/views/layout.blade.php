<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  @stack('stylesheets')
  <title>
    @yield('title') - {{ config('app.name') }}
  </title>
  <script>
    window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
  </script>
</head>
<body>
  <div id="root">
  </div>
@stack('scripts')
</body>
</html>
