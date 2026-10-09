<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publisher extends Model
{
    protected function casts(): array
    {
        return ['metadata' => 'array'];
    }

    public function editions(): HasMany
    {
        return $this->hasMany(Edition::class);
    }
}
