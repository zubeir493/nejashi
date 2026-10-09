<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 120);
            $table->string('platform', 16);
            $table->string('app_version', 32)->nullable();
            $table->string('push_token')->nullable();
            $table->timestamp('registered_at');
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'public_id']);
            $table->index(['user_id', 'revoked_at']);
        });

        Schema::create('downloads', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('device_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->restrictOnDelete();
            $table->string('status', 24)->default('queued')->index();
            $table->unsignedBigInteger('total_bytes')->nullable();
            $table->unsignedBigInteger('downloaded_bytes')->default(0);
            $table->string('asset_version', 100)->nullable();
            $table->timestamp('downloaded_at')->nullable();
            $table->timestamp('last_error_at')->nullable();
            $table->string('last_error_code', 80)->nullable();
            $table->timestamps();
            $table->unique(['device_id', 'publication_id']);
            $table->index(['user_id', 'status']);
        });

        Schema::create('device_licenses', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('device_id')->constrained()->cascadeOnDelete();
            $table->foreignId('entitlement_id')->constrained()->cascadeOnDelete();
            $table->string('license_system', 32);
            $table->string('provider_license_id', 160)->nullable();
            $table->timestamp('issued_at');
            $table->timestamp('offline_expires_at')->nullable();
            $table->timestamp('renewed_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
            $table->jsonb('license_metadata')->nullable();
            $table->timestamps();
            $table->unique(['device_id', 'entitlement_id', 'license_system']);
        });

        Schema::create('reading_progress', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->cascadeOnDelete();
            $table->foreignId('device_id')->nullable()->constrained()->nullOnDelete();
            $table->jsonb('locator');
            $table->decimal('percent_complete', 5, 2)->default(0);
            $table->uuid('last_client_event_id')->nullable();
            $table->timestamp('client_updated_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'publication_id']);
            $table->index(['user_id', 'updated_at']);
        });

        Schema::create('listening_progress', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->cascadeOnDelete();
            $table->foreignId('chapter_id')->nullable()->constrained('audiobook_chapters')->nullOnDelete();
            $table->foreignId('device_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedBigInteger('position_ms')->default(0);
            $table->decimal('playback_speed', 3, 2)->default(1.00);
            $table->uuid('last_client_event_id')->nullable();
            $table->timestamp('client_updated_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'publication_id']);
            $table->index(['user_id', 'updated_at']);
        });

        Schema::create('annotations', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->cascadeOnDelete();
            $table->string('kind', 16);
            $table->jsonb('locator');
            $table->text('selected_text')->nullable();
            $table->text('note')->nullable();
            $table->string('color', 24)->nullable();
            $table->timestamps();
            $table->index(['user_id', 'publication_id', 'kind']);
        });

        Schema::create('reviews', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('work_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('rating');
            $table->text('body')->nullable();
            $table->string('status', 24)->default('pending')->index();
            $table->timestamps();
            $table->unique(['user_id', 'work_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('annotations');
        Schema::dropIfExists('listening_progress');
        Schema::dropIfExists('reading_progress');
        Schema::dropIfExists('device_licenses');
        Schema::dropIfExists('downloads');
        Schema::dropIfExists('devices');
    }
};
