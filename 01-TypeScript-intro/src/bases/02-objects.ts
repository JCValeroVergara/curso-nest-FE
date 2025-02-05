export const pokemonIds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// export const pokemon = {
//     id: 1,
//     name: 'Bulbasaur',
//     type: 'Grass',
//     baseExperience: 64
// }

//Interface

interface Pokemon {
    id: number;
    name: string;
    type: string;
    baseExperience: number;
}

export const pokemon: Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass',
    baseExperience: 64
}


//Tipos en arreglos:

export const pokemons: Pokemon[] = [pokemon]

pokemons.push( pokemon)