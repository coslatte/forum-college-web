<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Comment extends Model
{
  protected $table = 'comments';

  protected $fillable = [
    'content',
    'upvotes',
    'downvotes',
    'user_id',
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
    return $this->belongsTo(User::class, 'user_id');
  }

}
