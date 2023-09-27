<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Conner\Likeable\Likeable;

class Answer extends Model
{
    use SoftDeletes, Likeable;

    protected $table = 'answer';

    protected $fillable = [
        'user_id',
        'discussion_id',
        'answer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }
}
