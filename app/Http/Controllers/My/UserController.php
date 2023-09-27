<?php

namespace App\Http\Controllers\My;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Discussion;
use App\Models\Answer;
use Storage;
use App\Http\Requests\User\UpdateRequest;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show($username)
    {
        $user = User::where('username', $username)->first();
        if (!$user) {
            return abort(404);
        }

        $picture = filter_var($user->picture, FILTER_VALIDATE_URL)
            ? $user->picture : Storage::url($user->picture);

        $perPage = 5;
        $columns = ['*'];
        $discussionsPageName = 'discussions';
        $answersPageName = 'answers';

        return Inertia::render('Users/Show', [
            'user' => $user,
            'picture' => $picture,
            'discussions' => Discussion::with('category', 'user', 'answer', 'likeCounter')->where('user_id', $user->id)
                ->orderBy('updated_at', 'desc')
                ->paginate($perPage, $columns, $discussionsPageName)->withQueryString(),
            'answers' => Answer::with('discussion', 'likeCounter')->where('user_id', $user->id)->whereRelation('discussion', 'deleted_at', null)
                ->orderBy('updated_at', 'desc')
                ->paginate($perPage, $columns, $answersPageName)->withQueryString(),
        ]);
    }

    public function edit($username)
    {
        $user = User::where('username', $username)->first();
        if (!$user || $user->id !== auth()->id()) {
            return abort(404);
        }

        return Inertia::render('Users/Form', [
            'user' => $user,
        ]);
    }

    public function update(UpdateRequest $request, $username)
    {
        $user = User::where('username', $username)->first();
        if (!$user || $user->id !== auth()->id()) {
            return abort(404);
        }

        $validated = $request->validated();

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']);
        }

        if ($request->hasFile('profile_photo')) {
            if (filter_var($user->profile_photo, FILTER_VALIDATE_URL) === false && $user->profile_photo) {
                Storage::disk('public')->delete($user->profile_photo);
            }

            $filePath = Storage::disk('public')->put('images/users/picture', request()->file('profile_photo'));
            $validated['profile_photo'] = $filePath;
        }

        $update = $user->update($validated);

        if ($update) {

            return redirect()->route('users.show', $validated['username'])->with([
                'message' => "User profile updated successfully!",
                'type' => 'success'
            ]);;
        }

        return abort(500);
    }
}
