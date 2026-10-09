<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publishers', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('contributors', function (Blueprint $table): void {
            $table->id();
            $table->string('display_name');
            $table->string('slug')->unique();
            $table->string('sort_name')->nullable();
            $table->text('biography')->nullable();
            $table->string('biography_language', 10)->nullable();
            $table->jsonb('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('works', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->jsonb('subjects')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->string('status', 24)->default('draft')->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('editions', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('work_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publisher_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->string('language_code', 10);
            $table->string('revision')->nullable();
            $table->unsignedSmallInteger('publication_year')->nullable();
            $table->jsonb('metadata')->nullable();
            $table->string('status', 24)->default('draft')->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->unique(['work_id', 'slug']);
            $table->index(['work_id', 'language_code']);
        });

        Schema::create('work_contributors', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('work_id')->constrained()->cascadeOnDelete();
            $table->foreignId('contributor_id')->constrained()->cascadeOnDelete();
            $table->string('role', 32);
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();
            $table->unique(['work_id', 'contributor_id', 'role']);
        });

        Schema::create('edition_contributors', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('edition_id')->constrained()->cascadeOnDelete();
            $table->foreignId('contributor_id')->constrained()->cascadeOnDelete();
            $table->string('role', 32);
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();
            $table->unique(['edition_id', 'contributor_id', 'role']);
        });

        Schema::create('publications', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('edition_id')->constrained()->cascadeOnDelete();
            $table->string('format', 24);
            $table->string('identifier')->nullable()->unique();
            $table->string('availability', 24)->default('unavailable')->index();
            $table->jsonb('metadata')->nullable();
            $table->timestamp('available_at')->nullable();
            $table->timestamps();
            $table->unique(['edition_id', 'format']);
        });

        Schema::create('ebook_publications', function (Blueprint $table): void {
            $table->foreignId('publication_id')->primary()->constrained('publications')->cascadeOnDelete();
            $table->string('layout', 24)->default('reflowable');
            $table->string('reading_direction', 8)->default('auto');
            $table->jsonb('reading_metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('audiobook_publications', function (Blueprint $table): void {
            $table->foreignId('publication_id')->primary()->constrained('publications')->cascadeOnDelete();
            $table->unsignedBigInteger('duration_seconds')->default(0);
            $table->string('narration_language', 10)->nullable();
            $table->jsonb('playback_metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('audiobook_chapters', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('publication_id')->constrained('audiobook_publications', 'publication_id')->cascadeOnDelete();
            $table->unsignedSmallInteger('position');
            $table->string('title');
            $table->unsignedBigInteger('duration_seconds')->default(0);
            $table->unsignedBigInteger('start_offset_ms')->default(0);
            $table->timestamps();
            $table->unique(['publication_id', 'position']);
        });

        Schema::create('publication_assets', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('publication_id')->constrained()->cascadeOnDelete();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('role', 32);
            $table->string('storage_disk', 64)->default('private_s3');
            $table->string('object_key')->unique();
            $table->string('media_type', 100);
            $table->string('mime_type', 150)->nullable();
            $table->unsignedBigInteger('size_bytes')->nullable();
            $table->char('sha256', 64)->nullable();
            $table->string('processing_state', 24)->default('queued')->index();
            $table->boolean('is_sample')->default(false);
            $table->jsonb('processing_metadata')->nullable();
            $table->timestamps();
            $table->index(['publication_id', 'role', 'is_sample']);
        });

        Schema::create('categories', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedSmallInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('work_categories', function (Blueprint $table): void {
            $table->foreignId('work_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->primary(['work_id', 'category_id']);
        });

        Schema::create('collections', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('status', 24)->default('draft')->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('collection_works', function (Blueprint $table): void {
            $table->foreignId('collection_id')->constrained()->cascadeOnDelete();
            $table->foreignId('work_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('position')->default(0);
            $table->primary(['collection_id', 'work_id']);
            $table->unique(['collection_id', 'position']);
        });

        Schema::create('home_sections', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('kind', 32);
            $table->foreignId('collection_id')->nullable()->constrained()->nullOnDelete();
            $table->jsonb('query_config')->nullable();
            $table->unsignedSmallInteger('position')->default(0);
            $table->boolean('is_enabled')->default(true)->index();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_sections');
        Schema::dropIfExists('collection_works');
        Schema::dropIfExists('collections');
        Schema::dropIfExists('work_categories');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('publication_assets');
        Schema::dropIfExists('audiobook_chapters');
        Schema::dropIfExists('audiobook_publications');
        Schema::dropIfExists('ebook_publications');
        Schema::dropIfExists('publications');
        Schema::dropIfExists('edition_contributors');
        Schema::dropIfExists('work_contributors');
        Schema::dropIfExists('editions');
        Schema::dropIfExists('works');
        Schema::dropIfExists('contributors');
        Schema::dropIfExists('publishers');
    }
};
