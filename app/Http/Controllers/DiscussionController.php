<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Discussion;
use App\Models\Answer;
use App\Http\Requests\Discussion\StoreRequest;
use App\Http\Requests\Discussion\UpdateRequest;
use Inertia\Inertia;
use Str;

class DiscussionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $discussions = Discussion::with('user', 'category', 'answer', 'likeCounter');

        if ($request->search) {
            $discussions->where('title', 'like', "%$request->search%")
                ->orWhere('content', 'like', "%$request->search%");
        }

        return Inertia::render('Discussions/Index', [
            'discussions' => $discussions->orderBy('created_at', 'desc')
                ->paginate(10)->withQueryString(),
            'categories' => Category::all(),
            'search' => $request->search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Discussions/Form', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $validated = $request->validated();
        $categoryId = Category::where('slug', $validated['category_slug'])->first()->id;

        $validated['category_id'] = $categoryId;
        $validated['user_id'] = auth()->id();
        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        $stripContent = strip_tags($validated['content']);
        $isContentLong = strlen($stripContent) > 120;
        $validated['content_preview'] = $isContentLong
            ? (substr($stripContent, 0, 120) . '...') : $stripContent;

        $create = Discussion::create($validated);

        if ($create) {

            return redirect()->route('discussions.index')->with([
                'message' => "Discussion created successfully!",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $discussion = Discussion::with('user', 'category', 'answer', 'likeCounter')->where('slug', $slug)->first();

        if (!$discussion) {
            return abort(404);
        }

        $discussionAnswers = Answer::with('user', 'likeCounter')
            ->where('discussion_id', $discussion->id)
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Discussions/Show', [
            'discussion' => $discussion,
            'categories' => Category::all(),
            'discussionAnswers' => $discussionAnswers,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        $discussion = Discussion::with('category')->where('slug', $slug)->first();

        if (!$discussion) {
            return abort(404);
        }

        $isOwnedByUser = $discussion->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        return Inertia::render('Discussions/Form', [
            'discussion' => $discussion,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $slug)
    {
        $discussion = Discussion::with('category')->where('slug', $slug)->first();

        if (!$discussion) {
            return abort(404);
        }

        $isOwnedByUser = $discussion->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        $validated = $request->validated();
        $categoryId = Category::where('slug', $validated['category_slug'])->first()->id;

        $validated['category_id'] = $categoryId;
        $validated['user_id'] = auth()->id();

        $stripContent = strip_tags($validated['content']);
        $isContentLong = strlen($stripContent) > 120;
        $validated['content_preview'] = $isContentLong
            ? (substr($stripContent, 0, 120) . '...') : $stripContent;

        $update = $discussion->update($validated);

        if ($update) {

            return redirect()->route('discussions.show', $slug)->with([
                'message' => "Discussion updated successfully!",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $discussion = Discussion::with('category')->where('slug', $slug)->first();

        if (!$discussion) {
            return abort(404);
        }

        $isOwnedByUser = $discussion->user_id == auth()->id();

        if (!$isOwnedByUser) {
            return abort(404);
        }

        $delete = $discussion->delete();

        if ($delete) {

            return redirect()->route('discussions.index')->with([
                'message' => "Discussion deleted successfully",
                'type' => 'success'
            ]);
        }

        return abort(500);
    }
}
