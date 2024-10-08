<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product; // Asegúrate de importar tu modelo Product

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Producto 1',
            'price' => 100.00,
            'description' => 'Descripción del Producto 1',
        ]);

        Product::create([
            'name' => 'Producto 2',
            'price' => 200.00,
            'description' => 'Descripción del Producto 2',
        ]);

        // Agrega más productos según sea necesario
    }
}
