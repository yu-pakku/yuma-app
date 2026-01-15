<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyLog extends Model
{
    protected $fillable = [
        'date',
        'minutes'
    ];

    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }
}
