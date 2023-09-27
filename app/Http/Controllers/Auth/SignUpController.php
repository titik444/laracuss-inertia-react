<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Inertia\Inertia;

class SignUpController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/SignUp');
    }

    public function signUp(SignUpRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = bcrypt($validated['password']);
        // $validated['profile_photo'] = config('app.avatar_generator_url') . $validated['username'];
        $validated['name'] = $validated['username'];

        $create = User::create($validated);

        if ($create) {
            Auth::login($create);
            return redirect()->route('discussions.index');
        }

        return abort(500);
    }
}
