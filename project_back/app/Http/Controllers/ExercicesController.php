<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\Training;
use Illuminate\Http\Request;

class ExercicesController extends Controller
{
     /**
     * @OA\Get(
     *     path="/exercices",
     *     summary="Liste tous les exercices",
     *     tags={"Exercices"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des exercices récupérée avec succès",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Exercice")
     *         )
     *     )
     * )
     */

      public function index()
      {
          return Exercice::all();
      }

        /**
     * @OA\Get(
     *     path="/exercices/{id}",
     *     summary="Affiche les détails d'un exercice",
     *     tags={"Exercices"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'exercice",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Détails de l'exercice récupérés",
     *         @OA\JsonContent(ref="#/components/schemas/Exercice")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercice non trouvé",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Exercice non trouvé")
     *         )
     *     )
     * )
     */

      public function show($id)
      {
          $exercice = Exercice::find($id);
          if ($exercice) {
              return response()->json($exercice);
          } else {
              return response()->json(['message' => 'Exercice non trouvé'], 404);
          }
      }

        /**
     * @OA\Post(
     *     path="/exercices",
     *     summary="Créer un nouvel exercice",
     *     tags={"Exercices"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Pompes"),
     *             @OA\Property(property="advice", type="string", example="Gardez le dos droit"),
     *             @OA\Property(property="series", type="integer", example=3),
     *             @OA\Property(property="repetitions", type="integer", example=12),
     *             @OA\Property(property="id_training", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Exercice créé avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Exercice")
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

      public function store(Request $request)
      {
          $validated = $request->validate([
              'name' => 'required|string|max:255',
              'advice' => 'nullable|string',
              'series' => 'required|integer',
              'repetitions' => 'required|integer',
          ]);

          $trainingId = $request->id_training;

          $maxRetries = 10;
          $retryInterval = 500000;
          $retries = 0;
          $training = null;
          while ($retries < $maxRetries) {
            $training = Training::find($trainingId);

            if ($training) {
                break;
            }

            usleep($retryInterval);
            $retries++;
        }

          $exercice = new Exercice;
          $exercice->name = $request->name;
          $exercice->training_id = $request->id_training;
          $exercice->advice = $request->advice;
          $exercice->series = $request->series;
          $exercice->repetitions = $request->repetitions;
          $exercice->save();

          if (!$training) {
              return response()->json(['message' => 'Séance non trouvée'], 404);
          }

          return response()->json($exercice, 201);
      }

          /**
     * @OA\Put(
     *     path="/exercices/{id}",
     *     summary="Mettre à jour un exercice",
     *     tags={"Exercices"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'exercice",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Pompes"),
     *             @OA\Property(property="advice", type="string", example="Gardez le dos droit")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exercice mis à jour avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/Exercice")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercice non trouvé",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Exercice non trouvé")
     *         )
     *     )
     * )
     */
      public function update(Request $request, $id)
      {
          $exercice = Exercice::find($id);
          if (!$exercice) {
              return response()->json(['message' => 'Exercice non trouvé'], 404);
          }

          $validated = $request->validate([
              'name' => 'required|string|max:255',
              'advice' => 'nullable|string',
          ]);

          $exercice->name = $request->name;
          $exercice->advice = $request->advice;
          $exercice->save();

          return response()->json($exercice);
      }

        /**
     * @OA\Delete(
     *     path="/exercices/{id}",
     *     summary="Supprimer un exercice",
     *     tags={"Exercices"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'exercice",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exercice supprimé avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Exercice supprimé avec succès")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercice non trouvé",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Exercice non trouvé")
     *         )
     *     )
     * )
     */

      public function destroy($id)
      {
          $exercice = Exercice::find($id);
          if ($exercice) {
              $exercice->delete();
              return response()->json(['message' => 'Exercice supprimé avec succès']);
          } else {
              return response()->json(['message' => 'Exercice non trouvé'], 404);
          }
      }
}
