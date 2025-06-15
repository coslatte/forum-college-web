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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:forum_users,username',
            'profile_pic' => 'nullable|image|max:2048',
        ]);
        $forum_users = ForumUsers::create($validated);
        return response()->json($forum_users, 201);
    }
}
