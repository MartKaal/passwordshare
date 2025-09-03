<?php

use Illuminate\Support\Facades\Crypt;
use App\Models\SharedPassword;
use App\Services\SharedPasswordService; 
use Illuminate\Support\Str;

use function Pest\Laravel\{assertDatabaseHas, assertDatabaseMissing};

beforeEach(function () {
    $this->service = new SharedPasswordService();
});

it('creates a shared password with encrypted value', function () {
    $password = 'super-secret';
    $sharedPassword = $this->service->createSharedPassword($password, 3, 24);

    expect($sharedPassword)->toBeInstanceOf(SharedPassword::class)
        ->and($sharedPassword->tries_left)->toBe(3)
        ->and($sharedPassword->expires_at->greaterThan(now()))->toBeTrue();

    assertDatabaseHas('shared_passwords', [
        'id' => $sharedPassword->id,
    ]);

    expect(Crypt::decryptString($sharedPassword->password))->toBe($password);
});

it('generates a valid link', function() {
    $key = Str::uuid()->toString();

    $link = $this->service->generateLink($key);

    expect($link)->toContain('/share/' . $key);

});

it('returns null if key does not exist', function () {
    expect($this->service->getSharedPassword(Str::uuid()))->toBeNull();
});

it('deletes and returns null if the password is expired', function () {
    $password = SharedPassword::factory()->create([
        'expires_at' => now()->subMinute(),
    ]);

    $result = $this->service->getSharedPassword($password->key);

    expect($result)->toBeNull();
    assertDatabaseMissing('shared_passwords', ['id' => $password->id]);
});

it('returns decrypted password and decrements tries_left when valid', function () {
    $password = SharedPassword::factory()->create([
        'tries_left' => 3,
        'password' => Crypt::encryptString('secret123'),
    ]);

    $result = $this->service->getSharedPassword($password->key);

    expect($result)->toBe('secret123');
    assertDatabaseHas('shared_passwords', ['id' => $password->id, 'tries_left' => 2]);
});

it('returns decrypted password and deletes when tries_left becomes 0', function () {
    $password = SharedPassword::factory()->create([
        'tries_left' => 1,
        'expires_at' => now()->addHour(),
        'password' => Crypt::encryptString('secret123'),
    ]);

    $result = $this->service->getSharedPassword($password->key);

    expect($result)->toBe('secret123');
    assertDatabaseMissing('shared_passwords', ['id' => $password->id]);
});