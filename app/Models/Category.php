<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    public $table = 'category';

    protected $fillable = [
        'name',
        'description',
    ];

    public function discussion()
    {
        return $this->hasMany(Discussion::class);
    }
}
