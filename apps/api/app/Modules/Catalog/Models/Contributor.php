<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contributor extends Model
{
    protected function casts(): array
    {
        return ['metadata' => 'array'];
    }

    public function works(): BelongsToMany
    {
        return $this->belongsToMany(Work::class, 'work_contributors')
            ->withPivot(['role', 'position'])->withTimestamps();
    }

    public function editions(): BelongsToMany
    {
        return $this->belongsToMany(Edition::class, 'edition_contributors')
            ->withPivot(['role', 'position'])->withTimestamps();
    }
}
