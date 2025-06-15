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

  public function getCommentDate($format = 'Y-m-d')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }

  public function getCommentHour($format = 'H:i:s')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }
}
