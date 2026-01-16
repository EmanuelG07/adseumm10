<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $contactMessage = \App\Models\ContactMessage::create($validated);

        return response()->json([
            'message' => 'Message sent successfully!',
            'data' => $contactMessage
        ], 201);
    }
}
