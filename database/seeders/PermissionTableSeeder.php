<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'users-all',
            'users-view',
            'users-create',
            'users-edit',
            'users-delete',
            'roles-all',
            'roles-view',
            'roles-create',
            'roles-edit',
            'roles-delete',
            'permissions-all',
            'permissions-view',
            'permissions-create',
            'permissions-edit',
            'permissions-delete',
            
            ///Especialidades
            'specialties-all',
            'specialties-view',
            'specialties-create',
            'specialties-edit',
            'specialties-delete',

            'students-all',
            'students-view',
            'students-create',
            'students-edit',
            'students-delete',
            
            // permisos de plan 
            'plan-all',
            'plan-view',
            'plan-create',
            'plan-edit',
            'plan-delete',

        ];

        $permissions = array_map(function ($name) {
            return [
                'name' => $name,
                'created_at' => now(),
            ];
        }, $permissions);

        DB::table('permissions')->insert($permissions);
    }
}
