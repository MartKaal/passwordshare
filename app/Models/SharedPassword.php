<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SharedPassword extends Model
{
    protected $fillable = ['key', 'password', 'tries_left', 'expires_at'];
}
