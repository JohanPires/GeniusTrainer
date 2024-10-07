<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrainingController extends Controller
{
      /**
     * @OA\Get(
     *     path="/trainings/user/{id}",
     *     summary="Récupère les séances d'un utilisateur avec leurs exercices",
     *     tags={"Trainings"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Liste des séances de l'utilisateur récupérée avec succès",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Training")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aucune séance trouvée",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Aucune séance trouvée")
     *         )
     *     )
     * )
     */
       public function index($id)
       {
        $trainings = Training::with('exercices')->where('user_id', $id)->get();

            if ($trainings) {
                return $trainings;
            } else {
                return response()->json(['message' => 'Aucune séance trouvée']);
           }
       }

        /**
     * @OA\Get(
     *     path="/trainings/admin",
     *     summary="Récupère toutes les séances (Admin)",
     *     tags={"Trainings"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des séances récupérée avec succès",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Training")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aucune séance trouvée",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Aucune séance trouvée")
     *         )
     *     )
     * )
     */

       public function adminTrainings()
       {
        $trainings = Training::with('exercices')->get();

            if ($trainings) {
                return $trainings;
            } else {
                return response()->json(['message' => 'Aucune séance trouvée']);
           }
       }

        /**
     * @OA\Get(
     *     path="/trainings/{id}",
     *     summary="Affiche les détails d'une séance avec ses exercices",
     *     tags={"Trainings"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la séance",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Détails de la séance récupérés avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Training")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Séance non trouvée",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Séance non trouvée")
     *         )
     *     )
     * )
     */
       public function show($id)
       {
           $seance = Training::with('exercices')->find($id);

           if ($seance) {
               return response()->json($seance);
           } else {
               return response()->json(['message' => 'Séance non trouvée'], 404);
           }
       }

         /**
     * @OA\Post(
     *     path="/trainings",
     *     summary="Créer une nouvelle séance",
     *     tags={"Trainings"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Séance du matin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Séance créée avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Training")
     *     )
     * )
     */
       public function store(Request $request)
       {
           $validated = $request->validate([
               'name' => 'nullable|string|max:255',
           ]);

           $training = new Training;
           $training->name = $request->name;
           $training->user_id = Auth::user()->id;
           $training->save();
           return response()->json($training, 201);
       }

        /**
     * @OA\Put(
     *     path="/trainings/{id}",
     *     summary="Mettre à jour une séance",
     *     tags={"Trainings"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la séance",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Séance modifiée")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Séance mise à jour avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Training")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Séance non trouvée",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Séance non trouvée")
     *         )
     *     )
     * )
     */

       public function update(Request $request, $id)
       {
           $training = Training::find($id);
           if (!$training) {
               return response()->json(['message' => 'Séance non trouvée'], 404);
           }

           $validated = $request->validate([
               'name' => 'nullable|string|max:255',
           ]);

           $training->name = $request->name;
           $training->save();

           return response()->json($training);
       }

       /**
     * @OA\Delete(
     *     path="/trainings/{id}",
     *     summary="Supprimer une séance",
     *     tags={"Trainings"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de la séance",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Séance supprimée avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Séance supprimée avec succès")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Séance non trouvée",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Séance non trouvée")
     *         )
     *     )
     * )
     */
       public function destroy($id)
       {
           $training = Training::find($id);
           if ($training) {
               $training->delete();
               return response()->json(['message' => 'Séance supprimée avec succès']);
           } else {
               return response()->json(['message' => 'Séance non trouvée'], 404);
           }
       }

       public function attachExercice(Request $request, $id)
{
    $training = Training::find($id);

    if (!$training) {
        return response()->json(['message' => 'Séance non trouvée'], 404);
    }

    // $validated = $request->validate([
    //     'exercice_id' => 'required|exists:exercices,id',
    //     'series' => 'required|integer',
    //     'repetitions' => 'required|integer',
    // ]);

    $training->exercices()->attach($request->exercice_id, [
        'series' => $request->series,
        'repetitions' =>  $request->repetitions,
    ]);

    return response()->json(['message' => 'Exercice ajouté à la séance avec succès']);
}
}
