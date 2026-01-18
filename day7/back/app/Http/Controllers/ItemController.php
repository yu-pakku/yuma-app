<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        return Item::orderBy('created_at', 'desc')->get();
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);

        $item->update([
            'status' => $request->states,
        ]);

        return response()->json($item);
    }
}
