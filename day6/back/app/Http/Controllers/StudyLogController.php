<?php

namespace App\Http\Controllers;

use App\Models\StudyLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StudyLogController extends Controller
{
    public function index(Request $request)
    {
        $query = StudyLog::with('subjects');

        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->filled('range')) {
            if ($request->range === 'today') {
                $query->whereDate('date', Carbon::today());
            }

            if ($request->range === 'week') {
                $query->whereBetween(
                    'date',
                    [
                        Carbon::now()->startOfWeek(),
                        Carbon::now()->endOfWeek(),
                    ]
                );
            }
        }

        $logs = $query->get();

        $totalMinutes = $logs->sum('minutes');

        $bySubject = [];

        foreach ($logs as $log) {
            foreach ($log->subjects as $subject) {
                $bySubject[$subject->name] =
                    ($bySubject[$subject->name] ?? 0) + $log->minutes;
            }
        }

        return response()->json([
            'logs' => $logs,
            'summary' => [
                'totalMinutes' => $totalMinutes,
                'bySubject' => $bySubject,
            ],
        ]);
    }

    //* 新規作成
    public function store(Request $request)
    {
        $log = StudyLog::create(
            $request->only(['date', 'minutes'])
        );

        $log->subjects()->sync($request->subject_ids);

        return response()->json(
            $log->load('subjects'),
            201
        );
    }

    //? 更新
    public function update(Request $request, $id)
    {
        $log = StudyLog::findOrFail($id);

        $log->update(
            $request->only(['date', 'minutes'])
        );

        $log->subjects()->sync($request->subject_ids);

        return response()->json(
            $log->load('subjects')
        );
    }

    //! 削除
    public function destroy($id)
    {
        StudyLog::findOrFail($id)->delete();

        return response()->json([
            'message' => 'deleted'
        ]);
    }
}
