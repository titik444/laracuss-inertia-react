<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Discussion;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($categorySlug)
    {
        $category = Category::where('slug', $categorySlug)->first();

        if (!$category) {
            return abort(404);
        }

        $discussions = Discussion::with(['user', 'category', 'answer', 'likeCounter'])
            ->where('category_id', $category->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Discussions/Index', [
            'discussions' => $discussions,
            'categories' => Category::all(),
            'withCategory' => $category,
        ]);
    }
}
