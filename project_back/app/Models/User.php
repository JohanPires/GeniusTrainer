<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

/**
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="Modèle représentant un utilisateur",
 *     @OA\Property(property="id", type="integer", example=1, description="ID de l'utilisateur"),
 *     @OA\Property(property="name", type="string", example="John Doe", description="Nom de l'utilisateur"),
 *     @OA\Property(property="email", type="string", format="email", example="john.doe@example.com", description="Adresse email de l'utilisateur"),
 *     @OA\Property(property="role", type="string", example="admin", description="Rôle de l'utilisateur"),
 *     @OA\Property(property="picture", type="string", example="https://example.com/profile.jpg", description="URL de la photo de profil de l'utilisateur"),
 *     @OA\Property(property="email_verified_at", type="string", format="date-time", description="Date de vérification de l'email"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Date de création de l'utilisateur"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Date de dernière mise à jour de l'utilisateur"),
 *     @OA\Property(property="trainings", type="array", @OA\Items(ref="#/components/schemas/Training"), description="Liste des séances d'entraînement associées à cet utilisateur")
 * )
 */

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'picture',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function boot() {
        parent::boot();

        static::deleting(function($user) {
            $user->trainings()->delete();
        });
    }

    public function trainings()
    {
        return $this->hasMany(Training::class);
    }
}
