<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\Discussion;
use App\Http\Requests\Answer\StoreRequest;
use App\Http\Requests\Answer\UpdateRequest;
use Inertia\Inertia;

class AnswerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, $slug)
    {
        $validated = $request->validated();

        $validated['user_id'] = auth()->id();
        $validated['discussion_id'] = Discussion::where('slug', $slug)->first()->id;

        $create = Answer::create($validated);

        if ($create) {

            return redirect()->route('discussions.show', $slug)->with([
                'message' => "Your answer posted successfully",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $answer = Answer::with('discussion')->find($id);

        if (!$answer) {
            return abort(404);
        }

        $isOwnedByUser = $answer->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        return Inertia::render('Answers/Form', [
            'answer' => $answer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $answer = Answer::find($id);

        if (!$answer) {
            return abort(404);
        }

        $isOwnedByUser = $answer->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        $validated = $request->validated();

        $update = $answer->update($validated);

        if ($update) {

            return redirect()->route('discussions.show', $answer->discussion->slug)->with([
                'message' => "Answer updated successfully!",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $answer = Answer::find($id);

        if (!$answer) {
            return abort(404);
        }

        $isOwnedByUser = $answer->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        $delete = $answer->delete();

        if ($delete) {

            return redirect()->route('discussions.show', $answer->discussion->slug)->with([
                'message' => "Answer deleted successfully!",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }
}
