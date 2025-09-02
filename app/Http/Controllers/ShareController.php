<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SharedPasswordService;

class ShareController extends Controller
{

    private SharedPasswordService $service;

    public function __construct(SharedPasswordService $service)
    {
        $this->service = $service;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'password' => 'required|string',
        ]);

        $sharedPassword = $this->service->createSharedPassword($validated['password']);
        $link = $this->service->generateLink($sharedPassword->key);

        return response()->json(['message' => 'Password shared successfully!', 'link' => $link]);
    }

    public function show($uuid)
    {
        $password = $this->service->getSharedPassword($uuid);

        if (!$password) {
            return response()->json(['message' => 'Password not found or has expired.'], 404);
        }

        return response()->json(['password' => $password]);
    }
}
