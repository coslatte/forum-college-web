<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  public function index()
  {
    $comments = Comment::with('user:id,username')->get();        
    return response()->json($comments);
  }

  public function show($id)
  {
    $comment = Comment::find($id);
    if (!$comment) {
      return response()->json(['message' => 'Comentario no encontrado'], 404);
    }
    return response()->json($comment);
  }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string|max:1024',
            'upvotes' => 'integer|required|min:0',
            'downvotes' => 'integer|required|min:0',
        ]);
        $comment = Comment::create($validated);
        return response()->json($comment, 201);
    }
}
