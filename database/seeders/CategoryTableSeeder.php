<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Category;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
            [
                'slug' => 'code-review',
                'name' => 'Code Review',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'eloquent',
                'name' => 'Eloquent',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'facade',
                'name' => 'Facade',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'general',
                'name' => 'General',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'javascript',
                'name' => 'JavaScript',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'mix',
                'name' => 'Mix',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'query-builder',
                'name' => 'Query Builder',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'requests',
                'name' => 'Requests',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'servers',
                'name' => 'Servers',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'testing',
                'name' => 'Testing',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'slug' => 'vite',
                'name' => 'Vite',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);
    }
}
