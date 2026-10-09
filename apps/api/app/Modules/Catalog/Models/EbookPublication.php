<?php

namespace App\Modules\Catalog\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EbookPublication extends Model
{
    protected $primaryKey = 'publication_id';

    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class);
    }
}
