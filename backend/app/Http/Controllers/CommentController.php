<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  // Obtener todos los comentarios
  public function index()
  {
    $comments = Comment::with('user:id,username')->get();        
    return response()->json($comments);
  }

  // Obtener un comentario por id
  public function show($id)
  {
    $comment = Comment::find($id);
    if (!$comment) {
      return response()->json(['message' => 'Comentario no encontrado'], 404);
    }
    return response()->json($comment);
  }

  // Guardar un nuevo comentario
  public function store(Request $request)
  {
    $validated = $request->validate([
      'users_id' => 'required|exists:users1,id',
      'content' => 'required|string|max:1024',
      'upvotes' => 'integer|required|min:0',
      'downvotes' => 'integer|required|min:0',
    ]);
    $comment = Comment::create($validated);
    return response()->json($comment, 201);
  }
}
