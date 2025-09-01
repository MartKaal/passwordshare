<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShareController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([=
            'password' => 'required|string',
        ]);

        // Logic to share the password (e.g., send an email)
        // Mail::to($validated['email'])->send(new SharePasswordMail($validated['password']));

        return response()->json(['message' => 'Password shared successfully!']);
    }
}
