<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Work extends Model
{
    protected function casts(): array
    {
        return ['subjects' => 'array', 'metadata' => 'array', 'published_at' => 'datetime'];
    }

    public function editions(): HasMany
    {
        return $this->hasMany(Edition::class);
    }

    public function contributors(): BelongsToMany
    {
        return $this->belongsToMany(Contributor::class, 'work_contributors')
            ->withPivot(['role', 'position'])->withTimestamps()->orderByPivot('position');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'work_categories');
    }
}
