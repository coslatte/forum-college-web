<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  // Obtener todos los comentarios
  public function index()
  {
    return response()->json(Comment::all());
  }

  // Guardar un nuevo comentario
  public function store(Request $request)
  {
    $validated = $request->validate([
      'user' => 'required|string|max:255',
      'content' => 'required|string|max:1024',
      'likes' => 'required|integer',
    ]);
    $comment = Comment::create($validated);
    return response()->json($comment, 201);
  }
}
