<?php

// SearchController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class SearchController extends BaseController
{
    public function search(Request $request)
    {
        $api_key = 'e3a3168197aff840ead92196f9a83b60f7bed2bb448b209a7ec169e5f8456887';
        $query = $request->query('q'); 

        if (empty($query)) {
            return response()->json(['error' => 'Query mancante']);
        }

        // interrogo l'API di SerpApi per Google Shopping
        $url = 'https://serpapi.com/search?' . http_build_query([
            'engine' => 'google_shopping',
            'q' => $query,
            'gl' => 'it',
            'hl' => 'it',
            'api_key' => $api_key
        ]);

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);    // Imposta l’URL di destinazione della richiesta.
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // resistuisce il risultato come stringa.

        $response = curl_exec($ch); // esegue la richiesta e assegna la risposta
        
        if (curl_errno($ch)) {
            return response()->json(['error' => curl_error($ch)]);
        }

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code !== 200) {
            return response()->json(['error' => "Errore HTTP: $http_code"]);
        }

        return response($response)->header('Content-Type', 'application/json'); // Restituisce la risposta JSON
    }
    
    //RICERCA
    public function fetch()
    {
        $userId = session('user_id');
        if (!$userId) {
            return response()->json([]); 
        }
    
        return \App\Models\Wishlist::where('user_id', $userId)->get();
    }
}