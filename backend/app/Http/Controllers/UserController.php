<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:users,username',
            'profile_pic' => 'nullable|image|max:2048',
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }
}
