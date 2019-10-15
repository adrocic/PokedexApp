<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    protected $fillable = [
        'id',
        'name',
        'types',
        'height',
        'weight',
        'abilities',
        'eggGroups',
        'stats',
        'genus',
        'description',
        'captured',
    ];

    public $timestamps = false;
}
