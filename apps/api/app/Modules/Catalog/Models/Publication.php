<?php

namespace App\Modules\Catalog\Models;

use App\Modules\Commerce\Models\Product;
use App\Modules\Library\Models\Entitlement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Publication extends Model
{
    public const FORMAT_EBOOK = 'ebook';

    public const FORMAT_AUDIOBOOK = 'audiobook';

    public const FORMAT_PHYSICAL = 'physical';

    protected function casts(): array
    {
        return ['metadata' => 'array', 'available_at' => 'datetime'];
    }

    public function edition(): BelongsTo
    {
        return $this->belongsTo(Edition::class);
    }

    public function ebookDetails(): HasOne
    {
        return $this->hasOne(EbookPublication::class);
    }

    public function audiobookDetails(): HasOne
    {
        return $this->hasOne(AudiobookPublication::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(PublicationAsset::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function entitlements(): HasMany
    {
        return $this->hasMany(Entitlement::class);
    }
}
