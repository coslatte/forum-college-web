<?php

namespace App\Http\Controllers;

use App\Models\ForumUser;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(ForumUser::all());
    }

    public function show($id)
    {
        $user = ForumUser::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:username',
            'profile_pic' => 'nullable|image|max:2048',
        ]);

        $user = ForumUser::create($validated);
        return response()->json($user, 201);
    }
}
