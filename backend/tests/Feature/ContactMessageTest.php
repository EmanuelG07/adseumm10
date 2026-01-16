<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_can_submit_contact_message(): void
    {
        $payload = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'message' => 'This is a test message',
        ];

        $response = $this->postJson('/api/contact', $payload);

        $response->assertStatus(201)
                 ->assertJson([
                     'message' => 'Message sent successfully!',
                 ]);

        $this->assertDatabaseHas('contact_messages', $payload);
    }
}
