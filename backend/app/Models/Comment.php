<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  use HasFactory;

  protected $table = 'comments';

  protected $fillable = [
    'users_id',
    'content',
    'upvotes',
    'downvotes'
  ];

<<<<<<< Updated upstream
=======
  protected $casts = [
    'upvotes' => 'integer',
    'downvotes' => 'integer'
  ];

>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    return $this->belongsTo(ForumUsers::class, 'users_id');
=======
    return $this->belongsTo(User::class, 'users_id');
>>>>>>> Stashed changes
  }
}
