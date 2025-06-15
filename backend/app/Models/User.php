<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UsersFactory> */
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'username',
        'profile_pic',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
