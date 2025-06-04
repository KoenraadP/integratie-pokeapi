"use strict";

// base api url
const apiUrl = "https://pokeapi.co/api/v2/";

// variabele om verkregen data in op te slaan
let pokemonData;

// html elementen binden
let searchInput = document.getElementById("search-input");
let divPokemonCards = document.getElementById("pokemon-cards");

// basis data van alle pokemon ophalen bij inladen pagina
getPokemonData();

function getPokemonData() {
    fetch(apiUrl + "pokemon?limit=1025")
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error(response.status)
        })
        .then(data => {
            // data van eerste fetch opslaan in de (globale) pokemonData array
            pokemonData = data.results;         
        })
        .catch(error => {
            console.error(error.message);
        })
}

// function om (HTML) card te maken met basis info van een pokemon
// als parameter geven we een pokemon object mee met de nodige info
function generatePokemonCard(pokemon) {

    let pokemonTypes = "";

    pokemon.types.forEach(element => {
        pokemonTypes += `<li class="list-group-item">${element.type.name}</li>`
    });

    const pokemondbUrl = "https://pokemondb.net/pokedex/" + pokemon.name;

    const pokemonCard =
        `<div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="card" style="width: 100%;">
                <a href="${pokemondbUrl}" target="_blank">
                <img src="${pokemon.image}" class="card-img-top">
                </a>
                <div class="card-body">
                    <p>#${pokemon.id} ${capitalise(pokemon.name)}</p>
                </div>
                <ul class="list-group list-group-flush">
                    ${pokemonTypes}
                </ul>
                </div>
            </div>
        </div>`

    return pokemonCard;
}

// function om hoofdletter aan het begin van een woord te plaatsen
function capitalise(word) {
    return word[0].toUpperCase() + word.substring(1);
}

// input event voor input vakje
// wordt getriggered bij ieder karakter dat ingetypt wordt
searchInput.addEventListener("input", () => {

    // div eerst leeg maken
    divPokemonCards.innerHTML = "";

    // wat werd er ingetypt?
    const userInput = searchInput.value.trim();

    // zoeken binnen de pokemonData array die opgevuld werd
    // bij het inladen van de pagina met alle 1025 pokemon objecten
    // als de userInput tekst voorkomt in de naam van een object
    // uit die array, voeg dan dit object toe aan een nieuwe array
    let foundPokemon = pokemonData.filter(p => p.name.includes(userInput));    
    
    // data ophalen voor de 'gevonden' pokemon
    // enkel de eerste 10 over houden als er meer dan 10 zijn
    foundPokemon.slice(0,10).forEach(element => {
        fetch(element.url)
            .then(response => {
                if(response.ok) return response.json()
                else throw new Error(response.status);
            })
            .then(data => {
                // nodige data van pokemon in object steken
                const pokemon = {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.front_default,
                    types: data.types
                }
                // card maken met info erin via de zelf gemaakte function
                // het pokemon object geven we door als parameter
                const pokemonCard = generatePokemonCard(pokemon);
                divPokemonCards.innerHTML += pokemonCard;
            })
            .catch(error => {
                console.log(error.message);
            })
    });
})