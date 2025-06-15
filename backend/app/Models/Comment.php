<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ForumUsers;

class Comment extends Model
{
  protected $table = 'comments';

  protected $fillable = [
    'users_id',
    'content',
    'upvotes',
    'downvotes'
  ];

  protected $casts = [
    'upvotes' => 'integer',
    'downvotes' => 'integer'
  ];

  public function getCommentDate($format = 'Y-m-d')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }

  public function getCommentHour($format = 'H:i:s')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }

  public function user()
  {
    return $this->belongsTo(ForumUsers::class, 'users_id');
  }
}
