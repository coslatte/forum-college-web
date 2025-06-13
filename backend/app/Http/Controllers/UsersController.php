<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json(Users::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:60|min:4|unique:users,username',
            'profile_pic' => 'nullable|image|max:2048',
        ]);
        $users = Users::create($validated);
        return response()->json($users, 201);
    }

}
