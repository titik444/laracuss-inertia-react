<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name'           => 'Super Admin',
            'username'       => 'admin',
            'email'          => 'admin@test.com',
            'password'       => Hash::make('admin1234'),
        ]);
        $admin->assignRole('admin');

        $user = User::create([
            'name'           => 'Udin',
            'username'       => 'udin',
            'email'          => 'udin@test.com',
            'password'       => Hash::make('user1234'),
        ]);
        $user->assignRole('user');
    }
}
