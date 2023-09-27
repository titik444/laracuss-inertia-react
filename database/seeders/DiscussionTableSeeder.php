<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class DiscussionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('discussion')->insert([
            [
                'slug' => 'code-review',
                'title' => 'Code Review',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'eloquent',
                'title' => 'Eloquent',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'facade',
                'title' => 'Facade',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'general',
                'title' => 'General',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'javascript',
                'title' => 'JavaScript',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'mix',
                'title' => 'Mix',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'query-builder',
                'title' => 'Query Builder',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'requests',
                'title' => 'Requests',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'servers',
                'title' => 'Servers',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'testing',
                'title' => 'Testing',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
            [
                'slug' => 'vite',
                'title' => 'Vite',
                'content_preview' => 'test',
                'content' => 'Lorem',
                'category_id' => 1,
                'user_id' => 1,
                'created_at'       => date('Y-m-d H:i:s'),
                'updated_at'       => date('Y-m-d H:i:s'),
            ],
        ]);
    }
}
