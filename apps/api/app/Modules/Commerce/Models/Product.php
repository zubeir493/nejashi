<?php

namespace App\Modules\Commerce\Models;

use App\Modules\Catalog\Models\Publication;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class);
    }

    public function bundle(): BelongsTo
    {
        return $this->belongsTo(Bundle::class);
    }

    public function prices(): HasMany
    {
        return $this->hasMany(Price::class);
    }
}
