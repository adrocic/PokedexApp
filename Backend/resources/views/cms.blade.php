@extends('layout')

@push('stylesheets')
  <link href="{{ mix('cms.css', 'build') }}" rel="stylesheet">
@endpush

@push('scripts')
  <script src="{{ mix('cms.js', 'build') }}"></script>
@endpush

