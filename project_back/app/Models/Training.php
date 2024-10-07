<?php

namespace App\Models;

use App\Models\Exercice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Training",
 *     type="object",
 *     title="Training",
 *     description="Un modèle représentant une séance d'entraînement",
 *     @OA\Property(property="id", type="integer", example=1, description="ID de la séance"),
 *     @OA\Property(property="nom", type="string", example="Séance de musculation", description="Nom de la séance"),
 *     @OA\Property(property="user_id", type="integer", example=1, description="ID de l'utilisateur propriétaire de la séance"),
 *     @OA\Property(property="exercices", type="array", @OA\Items(ref="#/components/schemas/Exercice"), description="Liste des exercices associés à la séance"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Date de création de la séance"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Date de dernière mise à jour de la séance")
 * )
 */

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'user_id'
    ];

    public static function boot() {
        parent::boot();

        static::deleting(function($training) {
            $training->exercices()->delete();
        });
    }

    public function exercices()
    {
        return $this->hasMany(Exercice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
