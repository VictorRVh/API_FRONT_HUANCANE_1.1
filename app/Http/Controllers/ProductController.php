<?php

namespace App\Http\Controllers;

use App\Models\Product; // Asegúrate de importar tu modelo Product
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{

    public function index(Request $request)
    {
        $products = Product::all(); // O puedes usar paginación: Product::paginate(10);
        return response()->json($products);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required'],
                'price' => ['required', 'numeric'],
                'description' => ['nullable', 'string'],
                // Agrega otras validaciones según sea necesario
            ]);

            $product = Product::create($validated); // Crear el producto con los datos validados

            return response()->json($product, 201); // Retorna el producto creado
        } catch (\Exception $error) {
            return $this->errorResponse($error);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'sometimes'],
                'price' => ['required', 'numeric', 'sometimes'],
                'description' => ['nullable', 'string'],
                // Agrega otras validaciones según sea necesario
            ]);

            $product = Product::find($id);
            if (!$product) {
                throw new \Exception('Error|Product not found--404', 13333);
            }

            foreach ($validated as $key => $val) {
                $product->{$key} = $val;
            }
            $product->save();

            return response()->json($product);
        } catch (\Exception $error) {
            return $this->errorResponse($error);
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                throw new \Exception('Error|Product not found--404', 13333);
            }

            $product->delete();

            return response()->json([], 204); // No content
        } catch (\Exception $error) {
            return $this->errorResponse($error);
        }
    }
}
