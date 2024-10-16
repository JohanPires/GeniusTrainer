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
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'role' => 'coach',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
        ]);

    }

    public function testRegisterWithInvalidEmail()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'role' => 'coach',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }
    public function testRegisterWithInvalidPassword()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'johndoe3@example.com',
            'role' => 'coach',
            'password' => 'pass',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }



    public function testGetUser()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'johndoe2@example.com',
            'role' => 'coach',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'johndoe2@example.com',
            'password' => 'password123',
        ]);

        $userId = $response->json('id');
        $token = $response->json('token');

        $userResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/user/' . $userId);

        $userResponse->assertStatus(200);
        $userResponse->assertJson([
            'id' => $userId,
            'name' => 'John Doe',
            'email' => 'johndoe2@example.com',
            'role' => 'coach',
        ]);
    }

    public function testLogin()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'johndoe2@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);

    }

    public function testLoginWithInvalidMail()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'joh@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['authentification']);
    }

    public function testLoginWithInvalidPassword()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'johndoe2@example.com',
            'password' => 'pass',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['authentification']);
    }

}
