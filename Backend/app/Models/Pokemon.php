<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $guarded = [];

    protected $casts = [
        'types' => 'array',
        'abilities' => 'array',
        'eggGroups' => 'array',
        'stats' => 'object'
    ];

    public $timestamps = false;
}
