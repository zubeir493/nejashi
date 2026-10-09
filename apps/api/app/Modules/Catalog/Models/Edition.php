<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Edition extends Model
{
    protected function casts(): array
    {
        return ['metadata' => 'array', 'published_at' => 'datetime'];
    }

    public function work(): BelongsTo
    {
        return $this->belongsTo(Work::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class);
    }

    public function contributors(): BelongsToMany
    {
        return $this->belongsToMany(Contributor::class, 'edition_contributors')
            ->withPivot(['role', 'position'])->withTimestamps()->orderByPivot('position');
    }
}
