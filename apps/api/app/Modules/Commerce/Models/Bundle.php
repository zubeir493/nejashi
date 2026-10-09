<?php

namespace App\Modules\Commerce\Models;

use App\Modules\Catalog\Models\Publication;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bundle extends Model
{
    public function publications(): BelongsToMany
    {
        return $this->belongsToMany(Publication::class, 'bundle_items');
    }

    public function product(): HasOne
    {
        return $this->hasOne(Product::class);
    }
}
