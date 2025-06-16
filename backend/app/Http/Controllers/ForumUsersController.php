<?php

namespace App\Http\Controllers;

use App\Models\ForumUsers;
use Illuminate\Http\Request;

class ForumUsersController extends Controller
{
    public function index()
    {
        return response()->json(ForumUsers::all());
    }

    public function show($id)
    {
        $forumUser = ForumUsers::findOrFail($id);
        return response()->json($forumUser);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:forum_users,username',
            'profile_pic' => 'nullable|image|max:2048',
        ]);

        $forumUser = ForumUsers::create($validated);

        return response()->json($forumUser, 201);
    }

    public function update(Request $request, $id)
    {
        $forumUser = ForumUsers::findOrFail($id);

        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:forum_users,username,' . $forumUser->id,
            'profile_pic' => 'nullable|image|max:2048',
        ]);

        $forumUser->update($validated);
        return response()->json($forumUser);
    }

    public function destroy($id)
    {
        $forumUser = ForumUsers::findOrFail($id);
        $forumUser->delete();
        return response()->noContent();
    }
}
