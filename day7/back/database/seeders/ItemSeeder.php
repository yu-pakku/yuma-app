<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Item::create([
            'title' => '最初のタスク',
            'status' => 'pending',
        ]);

        Item::create([
            'title' => '進行中のタスク',
            'status' => 'doing',
        ]);

        Item::create([
            'title' => '完了タスク',
            'status' => 'done',
        ]);
    }
}
