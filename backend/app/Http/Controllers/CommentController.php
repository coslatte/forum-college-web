<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
  // READ
  public function index()
  {
    $comments = Comment::with('forumUser:id,username')->get();
    return response()->json($comments);
  }

  // READ
  public function show($id)
  {
    return response()->json(Comment::with('forumUser:id,username')->findOrFail($id));
  }

  // DELETE
  public function destroy($id)
  {
    $comment = Comment::findOrFail($id);
    $comment->delete();
    return response()->json(['message' => 'Comentario eliminado']);
  }

  // CREATE
  public function store(Request $request)
  {
    $validated = $request->validate([
      'forum_users_id' => 'required|exists:forum_users,id',
      'content' => 'required|string|max:1024',
      'upvotes' => 'integer|min:0|default:0',
      'downvotes' => 'integer|min:0|default:0',
    ]);

    $comment = Comment::create($validated);
    return response()->json($comment, 201);
  }

  // UPDATE
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
