<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;

class User extends Model
{
    protected $table = 'user';

    protected $fillable = [
        'username',
        'profile_pic',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
