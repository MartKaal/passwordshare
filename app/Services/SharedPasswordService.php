<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\SharedPassword;
use Illuminate\Support\Facades\Crypt;


class SharedPasswordService
{
   public function createSharedPassword(string $password): SharedPassword 
   {
       return SharedPassword::create([
           'key' => Str::uuid(),
           'password' => Crypt::encryptString($password),
           'tries_left' => 1
       ]);
   } 

   public function generateLink(string $key): string
   {
       return url('/share/' . $key);
   }

   public function getSharedPassword(string $key): ?String
   {
        $password = SharedPassword::where('key', $key)->first();
        $tries_left = $password->tries_left;

        SharedPassword::where('key', $key)->update(['tries_left' => $tries_left - 1]);

        if ($tries_left === 0) {
            $password->delete();
        }

        if ($tries_left < 0) {
           return null;
        }

        return Crypt::decryptString($password->password);
   }
}

