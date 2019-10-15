@extends('layout')

@push('stylesheets')
  <link href="{{ mix('app.css', 'build') }}" rel="stylesheet">
@endpush

@push('scripts')
  <script>
    window.currentUser = @json($currentUser);
  </script>

  <script src="{{ mix('app.js', 'build') }}"></script>
@endpush

