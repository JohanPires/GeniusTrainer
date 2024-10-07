<?php

namespace App\Models;

use App\Models\Training;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Exercice",
 *     type="object",
 *     title="Exercice",
 *     description="Un modèle représentant un exercice d'entraînement",
 *     @OA\Property(property="id", type="integer", example=1, description="ID de l'exercice"),
 *     @OA\Property(property="nom", type="string", example="Pompes", description="Nom de l'exercice"),
 *     @OA\Property(property="description", type="string", example="Exercice de renforcement musculaire", description="Description de l'exercice"),
 *     @OA\Property(property="series", type="integer", example=3, description="Nombre de séries"),
 *     @OA\Property(property="repetitions", type="integer", example=12, description="Nombre de répétitions"),
 *     @OA\Property(property="training_id", type="integer", example=1, description="ID de la séance associée à cet exercice"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Date de création de l'exercice"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Date de dernière mise à jour de l'exercice")
 * )
 */

class Exercice extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'series',
        'repetitions'
    ];
    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
