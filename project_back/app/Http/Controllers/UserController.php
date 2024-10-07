<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

     /**
     * @OA\Get(
     *     path="/users",
     *     summary="Obtenir tous les utilisateurs",
     *     description="Récupère la liste de tous les utilisateurs.",
     *     tags={"Users"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des utilisateurs récupérée avec succès",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User"))
     *     )
     * )
     */

    public function getUsers() {
        $users = User::all();

        return $users;
    }

      /**
     * @OA\Get(
     *     path="/users/{id}",
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

    public function getOneUser($id) {
        $user = User::find($id);

        return $user;
    }

     /**
     * @OA\Delete(
     *     path="/users/{id}",
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

    public function deleteUser($id) {
        $user = User::find($id);
        $user->delete();

        return response()->json(['status' => 200, 'content' => 'Utilisateur supprimé avec succées']);
    }

       /**
     * @OA\Put(
     *     path="/users/{id}",
     *     summary="Modifier un utilisateur",
     *     description="Met à jour les informations d'un utilisateur par son ID.",
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
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john.doe@example.com"),
     *             @OA\Property(property="password", type="string", example="new_password"),
     *             @OA\Property(property="picture", type="string", example="profile_image.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur modifié avec succès",
     *         @OA\JsonContent(type="object", example={"status":200,"content":"Utilisateur modifié avec succès"})
     *     )
     * )
     */

    public function editUser($id, Request $request) {
        $user = User::find($id);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['status' => 200, 'content' => 'Utilisateur modifier avec succées', 'user' => $user]);
    }

     /**
     * @OA\Post(
     *     path="/register",
     *     summary="Enregistrer un utilisateur",
     *     description="Crée un nouvel utilisateur.",
     *     tags={"Users"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="john.doe@example.com"),
     *             @OA\Property(property="role", type="string", example="admin"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Utilisateur créé avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */



    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:admin,coach,athletes',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);
        if ($request->hasFile('picture')) {
            $user->profile_photo_path = $request->file('picture')->store('images/profil', 'public');
            $user->save();
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

     /**
     * @OA\Post(
     *     path="/users/{id}/picture",
     *     summary="Ajouter ou mettre à jour la photo de profil d'un utilisateur",
     *     description="Ajoute ou met à jour la photo de profil de l'utilisateur.",
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
     *         description="Photo de profil mise à jour avec succès",
     *         @OA\JsonContent(ref="#/components/schemas/User")
     *     )
     * )
     */

    public function storePicture(Request $request, $id) {
        $user = User::find($id);

        if ($request->hasFile('picture')) {
            if ($user->profile_photo_path) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
            $user->profile_photo_path = $request->file('picture')->store('images/profil', 'public');
            $user->save();
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Vos identifiants sont incorrect'],
            ]);
        }
        $token = $user->createToken('auth-token')->plainTextToken;
        $id = $user->id;

        return response()->json(['user' => $user,'token' => $token, 'id' => $id]);
    }

     /**
     * @OA\Post(
     *     path="/login",
     *     summary="Connexion d'un utilisateur",
     *     description="Authentifie un utilisateur et génère un jeton d'authentification.",
     *     tags={"Users"},
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
     *         @OA\JsonContent(type="object", example={"user":{"id":1,"name":"John Doe","email":"john.doe@example.com"},"token":"generated_token"})
     *     )
     * )
     */

    public function logout()
    {

        Auth::user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion']);
    }
}


