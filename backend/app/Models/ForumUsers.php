<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumUsers extends Model
{
    /** @use HasFactory<\Database\Factories\UsersFactory> */
    use HasFactory;
    protected $factory = \Database\Factories\ForumUsersFactory::class;

    protected $table = 'forum_users';

    protected $fillable = [
        'username',
        'profile_pic',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
