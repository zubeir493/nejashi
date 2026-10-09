<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('creators', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('display_name');
            $table->string('slug')->unique();
            $table->string('status', 24)->default('active')->index();
            $table->jsonb('payout_profile')->nullable();
            $table->timestamps();
        });

        Schema::create('referral_campaigns', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('creator_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('status', 24)->default('draft')->index();
            $table->unsignedSmallInteger('attribution_window_days')->default(30);
            $table->boolean('new_customers_only')->default(false);
            $table->char('currency', 3)->default('ETB');
            $table->bigInteger('budget_minor')->nullable();
            $table->bigInteger('spent_minor')->default(0);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->jsonb('eligibility_rules')->nullable();
            $table->timestamps();
        });

        Schema::create('referral_links', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('campaign_id')->constrained('referral_campaigns')->cascadeOnDelete();
            $table->string('label')->nullable();
            $table->string('code', 64)->unique();
            $table->string('destination')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('referral_attributions', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('creator_id')->constrained()->restrictOnDelete();
            $table->foreignId('campaign_id')->constrained('referral_campaigns')->restrictOnDelete();
            $table->foreignId('referral_link_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('referred_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->uuid('visitor_key')->nullable();
            $table->timestamp('attributed_at');
            $table->timestamp('expires_at');
            $table->timestamp('converted_at')->nullable();
            $table->timestamps();
            $table->index(['referred_user_id', 'expires_at']);
            $table->index(['visitor_key', 'expires_at']);
        });

        Schema::create('discount_rules', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('campaign_id')->constrained('referral_campaigns')->cascadeOnDelete();
            $table->string('scope_type', 24)->default('all');
            $table->unsignedBigInteger('scope_id')->nullable();
            $table->string('discount_type', 16)->default('percent');
            $table->unsignedInteger('discount_basis_points')->nullable();
            $table->bigInteger('discount_amount_minor')->nullable();
            $table->bigInteger('maximum_discount_minor')->nullable();
            $table->timestamps();
            $table->index(['campaign_id', 'scope_type', 'scope_id']);
        });

        Schema::create('promo_codes', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('campaign_id')->constrained('referral_campaigns')->cascadeOnDelete();
            $table->string('code', 64)->unique();
            $table->unsignedInteger('redemption_limit')->nullable();
            $table->unsignedInteger('redemptions_count')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        Schema::table('orders', function (Blueprint $table): void {
            $table->foreign('referral_attribution_id')
                ->references('public_id')
                ->on('referral_attributions')
                ->nullOnDelete();
        });

        Schema::create('commissions', function (Blueprint $table): void {
            $table->id();
            $table->uuid('public_id')->unique();
            $table->foreignId('creator_id')->constrained()->restrictOnDelete();
            $table->foreignId('campaign_id')->constrained('referral_campaigns')->restrictOnDelete();
            $table->foreignId('order_id')->constrained()->restrictOnDelete();
            $table->char('currency', 3);
            $table->bigInteger('order_net_minor');
            $table->unsignedInteger('commission_basis_points');
            $table->bigInteger('commission_minor');
            $table->string('status', 24)->default('pending')->index();
            $table->timestamp('eligible_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('reversed_at')->nullable();
            $table->timestamps();
            $table->unique('order_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commissions');
        Schema::table('orders', function (Blueprint $table): void {
            $table->dropForeign(['referral_attribution_id']);
        });
        Schema::dropIfExists('promo_codes');
        Schema::dropIfExists('discount_rules');
        Schema::dropIfExists('referral_attributions');
        Schema::dropIfExists('referral_links');
        Schema::dropIfExists('referral_campaigns');
        Schema::dropIfExists('creators');
    }
};
