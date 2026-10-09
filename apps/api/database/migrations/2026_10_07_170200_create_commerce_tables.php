<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bundles', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('status', 24)->default('draft')->index();
            $table->timestamps();
        });

        Schema::create('bundle_items', function (Blueprint $table): void {
            $table->foreignId('bundle_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->restrictOnDelete();
            $table->primary(['bundle_id', 'publication_id']);
        });

        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('publication_id')->nullable()->constrained()->restrictOnDelete();
            $table->foreignId('bundle_id')->nullable()->constrained()->restrictOnDelete();
            $table->string('name');
            $table->string('status', 24)->default('draft')->index();
            $table->timestamps();
            $table->unique('publication_id');
            $table->unique('bundle_id');
        });

        Schema::create('prices', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->char('currency', 3);
            $table->bigInteger('amount_minor');
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
            $table->index(['product_id', 'currency', 'starts_at', 'ends_at']);
        });

        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->char('currency', 3)->default('ETB');
            $table->bigInteger('subtotal_minor');
            $table->bigInteger('discount_minor')->default(0);
            $table->bigInteger('total_minor');
            $table->string('status', 24)->default('pending')->index();
            $table->string('idempotency_key', 120)->nullable();
            $table->uuid('referral_attribution_id')->nullable();
            $table->jsonb('discount_snapshot')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'idempotency_key']);
            $table->index(['user_id', 'created_at']);
        });

        Schema::create('order_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_name_snapshot');
            $table->char('currency', 3);
            $table->bigInteger('unit_price_minor');
            $table->unsignedSmallInteger('quantity')->default(1);
            $table->bigInteger('line_total_minor');
            $table->timestamps();
        });

        Schema::create('order_item_publications', function (Blueprint $table): void {
            $table->foreignId('order_item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->restrictOnDelete();
            $table->primary(['order_item_id', 'publication_id']);
        });

        Schema::create('payments', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('order_id')->constrained()->restrictOnDelete();
            $table->string('gateway', 32);
            $table->string('status', 24)->default('pending')->index();
            $table->string('tx_ref', 120);
            $table->string('provider_transaction_id', 120)->nullable();
            $table->char('currency', 3);
            $table->bigInteger('amount_minor');
            $table->jsonb('provider_payload')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->unique(['gateway', 'tx_ref']);
            $table->unique(['gateway', 'provider_transaction_id']);
            $table->index(['order_id', 'status']);
        });

        Schema::create('payment_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('payment_id')->constrained()->cascadeOnDelete();
            $table->string('gateway', 32);
            $table->string('provider_event_id', 160)->nullable();
            $table->string('event_type', 80);
            $table->boolean('signature_valid')->default(false);
            $table->jsonb('payload')->nullable();
            $table->timestamp('received_at');
            $table->timestamps();
            $table->unique(['gateway', 'provider_event_id']);
            $table->index(['payment_id', 'received_at']);
        });

        Schema::create('entitlements', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('publication_id')->constrained()->restrictOnDelete();
            $table->foreignId('order_item_id')->nullable()->constrained()->nullOnDelete();
            $table->string('source_type', 32);
            $table->string('source_key', 120);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
            $table->jsonb('grant_metadata')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'publication_id', 'source_type', 'source_key'], 'entitlements_source_unique');
            $table->index(['user_id', 'revoked_at', 'ends_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entitlements');
        Schema::dropIfExists('payment_events');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('order_item_publications');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('prices');
        Schema::dropIfExists('products');
        Schema::dropIfExists('bundle_items');
        Schema::dropIfExists('bundles');
    }
};
