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
    return response()->json(Comment::with('user:id,username')->findOrFail($id));
  }

  // Eliminar un comentario
  public function destroy($id)
  {
    $comment = Comment::findOrFail($id);
    $comment->delete();
    return response()->json(['message' => 'Comentario eliminado']);
  }

  // Guardar un nuevo comentario
  public function store(Request $request)
  {
    $validated = $request->validate([
      'users_id' => 'required|exists:users,id',
      'content' => 'required|string|max:1024',
      'upvotes' => 'integer|min:0|default:0',
      'downvotes' => 'integer|min:0|default:0',
    ]);

    $comment = Comment::create($validated);
    return response()->json($comment, 201);
  }

  // Actualizar un comentario
  public function update(Request $request, $id)
  {
    $comment = Comment::findOrFail($id);
    $validated = $request->validate([
      'content' => 'required|string|max:1024',
      'upvotes' => 'integer|min:0',
      'downvotes' => 'integer|min:0',
    ]);

    $comment->update($validated);
    return response()->json($comment);
  }
}
