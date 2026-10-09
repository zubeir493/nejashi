<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AudiobookPublication extends Model
{
    protected $primaryKey = 'publication_id';

    protected function casts(): array
    {
        return ['playback_metadata' => 'array'];
    }

    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class);
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(AudiobookChapter::class, 'publication_id', 'publication_id')->orderBy('position');
    }
}
