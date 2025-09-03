<?php
namespace Database\Factories;

use App\Models\SharedPassword;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;

class SharedPasswordFactory extends Factory {

    protected $model = SharedPassword::class;
    
        public function definition(): array
    {
        return [
            'key' => Str::uuid()->toString(),
            'password' => Crypt::encryptString('default-password'),
            'tries_left' => 3,
            'expires_at' => now()->addHour(),
        ];
    }
}