<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Email;

class authController extends Controller
{
    public function Register(Request $request){
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => 'required|min:8|string|confirmed',
        ]);
        $users = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => $fields['password'],
        ]);
        $token = $users->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Register berhasil',
            'user' => $users,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }
    public function Login(Request $request){
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if(!Auth::attempt(['email' => $fields['email'], 'password'=> $fields['password']])){
            return response()->json([
                'message'=>'email atau password salah',
            ], 401);
        }

        $user = User::where('email', $fields['email'])->firstOrFail();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message'      => 'Login berhasil',
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer'
        ], 200);
    }

    public function user(Request $request){
        return response()->json([
            'user'=>$request->user()
        ], 200);
    }

    public function logout(Request $request){
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Berhasil logout'
            ], 200);
        }

        return response()->json([
            'message' => 'Token tidak valid atau user tidak ditemukan'
        ], 401);
    }
}
