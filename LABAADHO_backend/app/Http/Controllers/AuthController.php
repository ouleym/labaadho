<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Utilisateur;

class AuthController extends Controller
{
    // ============================
    // 👤 CLIENT
    // ============================

    // ✅ Inscription client
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = Utilisateur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client',
        ]);

        $token = $user->createToken('auth_token', ['client'])->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'access_token' => $token, // ✅ nom harmonisé avec Angular
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    // ✅ Connexion client
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = Utilisateur::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 422);
        }

        if ($user->role !== 'client') {
            return response()->json(['message' => 'Veuillez vous connecter via l’espace admin'], 403);
        }

        $token = $user->createToken('auth_token', ['client'])->plainTextToken;

        return response()->json([
            'access_token' => $token, // ✅ cohérent avec Angular
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // ✅ Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie.']);
    }

    // ✅ Mise à jour profil client
    public function MettreAJourProfil(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:utilisateurs,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['user' => $user, 'message' => 'Profil mis à jour.']);
    }

    // ============================
    // 🔐 ADMIN
    // ============================

    public function loginAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Utilisateur::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 422);
        }

        if ($admin->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $token = $admin->createToken('admin_token', ['admin'])->plainTextToken;

        return response()->json([
            'message' => 'Connexion admin réussie',
            'access_token' => $token, // ✅ cohérent avec Angular
            'token_type' => 'Bearer',
            'user' => $admin
        ]);
    }

    public function logoutAdmin(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion admin réussie']);
    }
}
