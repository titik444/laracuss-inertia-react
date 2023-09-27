<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Conner\Likeable\Likeable;

class Discussion extends Model
{
    use SoftDeletes, Likeable;

    protected $table = 'discussion';

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'content_preview',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function answer()
    {
        return $this->hasMany(Answer::class);
    }
}
