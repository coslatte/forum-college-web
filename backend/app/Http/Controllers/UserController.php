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

<<<<<<< HEAD
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:username',
=======
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:users,username',
>>>>>>> 43387c9f2e8211cfb67c995618000e0ac5179f54
            'profile_pic' => 'nullable|image|max:2048',
        ]);

        $user = User::create($validated);
<<<<<<< HEAD

=======
>>>>>>> 43387c9f2e8211cfb67c995618000e0ac5179f54
        return response()->json($user, 201);
    }
}
