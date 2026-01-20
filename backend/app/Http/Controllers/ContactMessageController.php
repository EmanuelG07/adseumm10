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
    // Admin: Toon alle berichten
    public function adminIndex()
    {
        $messages = \App\Models\ContactMessage::latest()->get();
        return view('admin.messages', compact('messages'));
    }

    // Admin: Verwijder bericht
    public function adminDestroy(\App\Models\ContactMessage $message)
    {
        $message->delete();
        return redirect()->back()->with('success', 'Bericht verwijderd.');
    }
}
