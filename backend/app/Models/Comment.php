<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
  use HasFactory;

  protected $table = 'comments';

  protected $fillable = [
    'user',
    'content',
    'likes',
  ];

  
  public function getCommentDate($format = 'Y-m-d')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }

  public function getCommentHour($format = 'H:i:s')
  {
    return $this->created_at ? $this->created_at->format($format) : null;
  }
}
