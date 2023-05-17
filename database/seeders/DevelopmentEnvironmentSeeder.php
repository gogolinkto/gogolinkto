<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DevelopmentEnvironmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createUser();
    }

    public function createUser(): User
    {
        return User::factory()->withPersonalTeam()->create([
            'name' => 'John Doe',
            'email' => 'user@example.com',
        ]);
    }
}
