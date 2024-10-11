<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;

use Illuminate\Validation\Rule;


class StudentController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Obtener todos los estudiantes
        $students = Student::all();
        return response()->json($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validar la solicitud
            $validated = $request->validate([
                'nombre' => ['required', 'string', 'max:255'],
                'apellido' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:students,email'],
            ]);

            // Crear un nuevo estudiante
            $student = new Student();
            $student->fill($validated);
            $student->save();

            return response()->json($student, 201); // Retornar el estudiante creado
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500); // Manejar el error
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Validar la solicitud
            $validated = $request->validate([
                'nombre' => ['sometimes', 'string', 'max:255'],
                'apellido' => ['sometimes', 'string', 'max:255'],
                'email' => [
                    'sometimes',
                    'email',
                    Rule::unique('students')->ignore($id),
                ],
            ]);

            // Buscar al estudiante por ID
            $student = Student::find($id);
            if (!$student) {
                throw new \Exception('Error|Student not found--404', 13333);
            }

            // Actualizar los campos validados
            $student->fill($validated);
            $student->save();

            return response()->json($student); // Retornar el estudiante actualizado
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500); // Manejar el error
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            // Buscar al estudiante por ID
            $student = Student::find($id);
            if (!$student) {
                throw new \Exception('Error|Student not found--404', 13333);
            }

            // Eliminar el estudiante
            $student->delete();

            return response()->json([], 204); // Retornar respuesta vacía con código 204
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 500); // Manejar el error
        }
    }
}
