<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Pokemon;
use App\Http\Resources\Pokemon as PokemonResource;

class PokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searched_pokemon = Pokemon::where('name', 'LIKE', ("%" . $request->input('name') . "%"))->paginate(12);
        return PokemonResource::collection($searched_pokemon);
    }

    /**
     * Display the specified resources.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function captured(Request $request)
    {
        $captured_pokemon = Pokemon::where('captured', true)->paginate(12);
        return PokemonResource::collection($captured_pokemon);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Get individual pokemon
        $pokemon = Pokemon::findOrFail($id);

        return new PokemonResource($pokemon);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function capture(Request $request, $id)
    {
        Pokemon::where('id', $id)->update(['captured' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
