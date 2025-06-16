<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ForumUsers;

class Comment extends Model
{
  use HasFactory;

  protected $factory = \Database\Factories\CommentFactory::class;

  protected $table = 'comments';

  protected $fillable = [
    'forum_users_id',
    'content',
    'upvotes',
    'downvotes'
  ];

  protected $casts = [
    'upvotes' => 'integer',
    'downvotes' => 'integer'
  ];

  public function forumUser()
  {
    return $this->belongsTo(ForumUsers::class, 'forum_users_id');
  }
}
