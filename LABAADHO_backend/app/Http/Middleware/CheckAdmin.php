<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // récupère l'utilisateur connecté via Sanctum

        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        return $next($request);
    }
}
