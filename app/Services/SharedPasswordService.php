<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\SharedPassword;
use Illuminate\Support\Facades\Crypt;


class SharedPasswordService
{
   public function createSharedPassword(string $password, int $tries, int $expiresIn): SharedPassword
   {
       return SharedPassword::create([
           'key' => Str::uuid(),
           'password' => Crypt::encryptString($password),
           'tries_left' => $tries,
           'expires_at' => now()->addHours($expiresIn)
       ]);
   } 

   public function generateLink(string $key): string
   {
       return url('/share/' . $key);
   }

   public function getSharedPassword(string $key): ?String
   {
        $sharedPassword = SharedPassword::where('key', $key)->first();
        if (!$sharedPassword) {
            return null;
        }

        if ($sharedPassword->tries_left < 1) {
            $sharedPassword->delete();
            return null;
        }
        if (now()->greaterThan($sharedPassword->expires_at)) {
            $sharedPassword->delete();
            return null;
        }
        $sharedPassword->decrement('tries_left');

        if ($sharedPassword->tries_left === 1) {
            $sharedPassword->delete();
        }

        return Crypt::decryptString($sharedPassword->password);
   }
}

