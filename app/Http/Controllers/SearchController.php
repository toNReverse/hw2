<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class SearchController extends BaseController
{
    public function search(Request $request)
    {
        $api_key = env('SERPAPI_KEY');

        $query = $request->query('q'); 

        if (empty($query)) {
            return response()->json(['error' => 'Query mancante']);
        }

        $url = 'https://serpapi.com/search?' . http_build_query([
            'engine' => 'google_shopping',
            'q' => $query,
            'gl' => 'it',
            'hl' => 'it',
            'api_key' => $api_key
        ]);

        $ch = curl_init($url);  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch); 
        
        if (curl_errno($ch)) {
            return response()->json(['error' => curl_error($ch)]);
        }

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code !== 200) {
            return response()->json(['error' => "Errore HTTP: $http_code"]);
        }

        return response($response)->header('Content-Type', 'application/json');
    }
}