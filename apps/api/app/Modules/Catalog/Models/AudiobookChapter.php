<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AudiobookChapter extends Model
{
    public function audiobook(): BelongsTo
    {
        return $this->belongsTo(AudiobookPublication::class, 'publication_id', 'publication_id');
    }
}
