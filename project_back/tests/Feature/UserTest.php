<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{

    use RefreshDatabase;

    public function testRegisterWithValidData()
    {
        $response = $this->postJson('/register', [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'role' => 'coach',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
        ]);

        User::where('email', 'johndoe@example.com')->delete();
    }

    public function testRegisterWithInvalidValidEmail()
    {
        $response = $this->postJson('/register', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'role' => 'coach',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');

    }

    public function testRegisterWithInvalidValidPassword()
    {

        $response = $this->postJson('/register', [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'role' => 'admin',
            'password' => 'short',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function testRegisterWithInvalidValidName()
    {

        $response = $this->postJson('/register', [
            'name' => '',
            'email' => 'johndoe@example.com',
            'role' => 'admin',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('name');
    }


    // public function testRegisterWithInvalidValidRole()
    // {

    //     $response = $this->postJson('/register', [
    //         'name' => 'John Doe',
    //         'email' => 'johndoe@example.com',
    //         'role' => 'invalid_role',
    //         'password' => 'password123',
    //         'password_confirmation' => 'password123',
    //     ]);

    //     $response->assertStatus(422);
    //     $response->assertJsonValidationErrors('role');
    // }


}
