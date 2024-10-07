<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\ExercicesController;
use App\Http\Controllers\Auth\RegisteredUserController;

/**
 * @OA\Post(
 *     path="/register",
 *     summary="Inscription d'un nouvel utilisateur",
 *     description="Permet à un utilisateur de s'enregistrer.",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/User")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Utilisateur créé avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/User")
 *     )
 * )
 */
Route::post('/register', [UserController::class, 'register']);
/**
 * @OA\Post(
 *     path="/login",
 *     summary="Connexion utilisateur",
 *     description="Authentifie un utilisateur et renvoie un token.",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="email", type="string", example="john.doe@example.com"),
 *             @OA\Property(property="password", type="string", example="password123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Connexion réussie",
 *         @OA\JsonContent(type="object", example={"token": "auth_token"})
 *     )
 * )
 */
Route::post('/login', [UserController::class, 'login']);
/**
 * @OA\Post(
 *     path="/user/picture/{id}",
 *     summary="Ajouter ou mettre à jour la photo de profil de l'utilisateur",
 *     description="Permet de télécharger et de mettre à jour la photo de profil d'un utilisateur.",
 *     tags={"Users"},
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID de l'utilisateur",
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(property="picture", type="file", description="Image de profil")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Image de profil mise à jour",
 *         @OA\JsonContent(ref="#/components/schemas/User")
 *     )
 * )
 */
Route::post('/user/picture/{id}', [UserController::class, 'storePicture']);

Route::middleware('auth:sanctum')->group(function () {
     /**
     * @OA\Get(
     *     path="/user",
     *     summary="Récupérer la liste des utilisateurs",
     *     description="Récupère les informations de tous les utilisateurs.",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des utilisateurs récupérée avec succès",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User"))
     *     )
     * )
     */
    Route::get('/user', [UserController::class, 'getUsers']);
     /**
     * @OA\Get(
     *     path="/user/{id}",
     *     summary="Obtenir un utilisateur spécifique",
     *     description="Récupère les détails d'un utilisateur par son ID.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur récupéré avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    Route::get('/user/{id}', [UserController::class, 'getOneUser']);
     /**
     * @OA\Put(
     *     path="/user/{id}",
     *     summary="Modifier un utilisateur",
     *     description="Met à jour les informations d'un utilisateur.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur modifié avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */
    Route::put('/user/{id}', [UserController::class, 'editUser']);
      /**
     * @OA\Delete(
     *     path="/user/{id}",
     *     summary="Supprimer un utilisateur",
     *     description="Supprime un utilisateur par son ID.",
     *     tags={"Users"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'utilisateur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur supprimé avec succès",
     *         @OA\JsonContent(type="object", example={"status":200,"content":"Utilisateur supprimé avec succès"})
     *     )
     * )
     */
    Route::delete('/user/{id}', [UserController::class, 'deleteUser']);
       /**
     * @OA\Post(
     *     path="/logout",
     *     summary="Déconnexion utilisateur",
     *     description="Déconnecte l'utilisateur en supprimant son token actuel.",
     *     tags={"Auth"},
     *     @OA\Response(
     *         response=200,
     *         description="Déconnexion réussie",
     *         @OA\JsonContent(type="object", example={"message":"Déconnexion"})
     *     )
     * )
     */
    Route::post('/logout', [UserController::class, 'logout']);

 /**
     * @OA\Get(
     *     path="/training/{id}",
     *     summary="Obtenir les séances d'un utilisateur",
     *     description="Récupère la liste des séances d'un utilisateur par son ID.",
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
     *         description="Liste des séances récupérée",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Training"))
     *     )
     * )
     */
    Route::get('/training/{id}', [TrainingController::class, 'index']);
    /**
 * @OA\Get(
 *     path="/training",
 *     summary="Récupérer toutes les séances (Admin)",
 *     description="Récupère la liste complète des séances (accessible par les admins).",
 *     tags={"Trainings"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste complète des séances récupérée",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Training"))
 *     )
 * )
 */
    Route::get('/training', [TrainingController::class, 'adminTrainings']);
    /**
 * @OA\Get(
 *     path="/training/one/{id}",
 *     summary="Obtenir une séance spécifique",
 *     description="Récupère les détails d'une séance par son ID.",
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
 *         description="Séance récupérée avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Training")
 *     )
 * )
 */
    Route::get('/training/one/{id}', [TrainingController::class, 'show']);
    /**
 * @OA\Post(
 *     path="/training",
 *     summary="Créer une nouvelle séance",
 *     description="Crée une nouvelle séance pour un utilisateur.",
 *     tags={"Trainings"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/Training")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Séance créée avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Training")
 *     )
 * )
 */
    Route::post('/training', [TrainingController::class, 'store']);
    /**
 * @OA\Put(
 *     path="/training/{id}",
 *     summary="Modifier une séance",
 *     description="Met à jour les informations d'une séance.",
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
 *         @OA\JsonContent(ref="#/components/schemas/Training")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Séance modifiée avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Training")
 *     )
 * )
 */

    Route::put('/training/{id}', [TrainingController::class, 'update']);
    /**
 * @OA\Delete(
 *     path="/training/{id}",
 *     summary="Supprimer une séance",
 *     description="Supprime une séance par son ID.",
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
 *         @OA\JsonContent(type="object", example={"status":200,"content":"Séance supprimée avec succès"})
 *     )
 * )
 */
    Route::delete('/training/{id}', [TrainingController::class, 'destroy']);
    /**
 * @OA\Post(
 *     path="/attachExercice/{id}",
 *     summary="Attacher un exercice à une séance",
 *     description="Attache un exercice à une séance spécifiée par son ID.",
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
 *             @OA\Property(property="exercice_id", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Exercice attaché avec succès",
 *         @OA\JsonContent(type="object", example={"status":200,"content":"Exercice attaché avec succès"})
 *     )
 * )
 */
    Route::post('/attachExercice/{id}', [TrainingController::class, 'attachExercice']);

/**
 * @OA\Get(
 *     path="/exercices",
 *     summary="Récupérer tous les exercices",
 *     description="Récupère la liste complète des exercices.",
 *     tags={"Exercices"},
 *     @OA\Response(
 *         response=200,
 *         description="Liste complète des exercices récupérée",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Exercice"))
 *     )
 * )
 */
    Route::get('/exercices', [ExercicesController::class, 'index']);
    /**
 * @OA\Get(
 *     path="/exercices/{id}",
 *     summary="Obtenir un exercice spécifique",
 *     description="Récupère les détails d'un exercice par son ID.",
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
 *         description="Exercice récupéré avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Exercice")
 *     )
 * )
 */
    Route::get('/exercices/{id}', [ExercicesController::class, 'show']);
    /**
 * @OA\Post(
 *     path="/exercices",
 *     summary="Créer un nouvel exercice",
 *     description="Crée un nouvel exercice.",
 *     tags={"Exercices"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/Exercice")
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Exercice créé avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Exercice")
 *     )
 * )
 */
    Route::post('/exercices', [ExercicesController::class, 'store']);
    /**
 * @OA\Put(
 *     path="/exercices/{id}",
 *     summary="Modifier un exercice",
 *     description="Met à jour les informations d'un exercice.",
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
 *         @OA\JsonContent(ref="#/components/schemas/Exercice")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Exercice modifié avec succès",
 *         @OA\JsonContent(ref="#/components/schemas/Exercice")
 *     )
 * )
 */
    Route::put('/exercices/{id}', [ExercicesController::class, 'update']);

    /**
 * @OA\Delete(
 *     path="/exercices/{id}",
 *     summary="Supprimer un exercice",
 *     description="Supprime un exercice par son ID.",
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
 *         @OA\JsonContent(type="object", example={"status":200,"content":"Exercice supprimé avec succès"})
 *     )
 * )
 */
    Route::delete('/exercices/{id}', [ExercicesController::class, 'destroy']);
});
