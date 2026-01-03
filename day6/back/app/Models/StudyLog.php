<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyLog extends Model
{
    protected $fillable = [
        'date',
        'minutes'
    ];

    public function subject()
    {
        return $this->belongsToMany(Subject::class);
    }
}
