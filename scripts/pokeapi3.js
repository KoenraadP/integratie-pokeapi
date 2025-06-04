"use strict";

// base api url
const apiUrl = "https://pokeapi.co/api/v2/";

// variabelen om verkregen data in op te slaan
let pokemonData;
let pokemonNames;

// object om in te vullen en gebruiken later
const pokemon = {
    id: "",
    name: "",
    image: "",
    types: []
};

// html elementen binden
let searchInput = document.getElementById("search-input");
let dataList = document.getElementById("datalist");
let searchButton = document.getElementById("search-button");
let divPokemonCard = document.getElementById("pokemon-card");

// data van alle pokemon ophalen bij inladen pagina
getPokemonData();

function getPokemonData() {
    fetch(apiUrl + "pokemon/?limit=1025")
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error(response.status)
        })
        .then(data => {
            // data van eerste fetch opslaan in de (globale) pokemonData array
            pokemonData = data.results;
            // alle .name property values vanuit de data halen en apart in pokemonNames array opslaan
            pokemonNames = pokemonData.map(p => p.name);
            // datalist opvullen met alle namen
            pokemonNames.forEach(element => {
                // HTML code voor option maken
                // bijvoorbeeld: <option>bulbasaur</option>
                const option = `<option>${element}</option>`;
                dataList.innerHTML += option;
            });
        })
        .catch(error => {
            console.error(error.message);
        })
}

// function om (HTML) card te maken met basis info van een pokemon
function generateInfoDiv() {

    let pokemonTypes = "";

    pokemon.types.forEach(element => {
        pokemonTypes += `<li class="list-group-item">${element.type.name}</li>`
    });

    const pokemondbUrl = "https://pokemondb.net/pokedex/" + pokemon.name;

    const pokemonDiv =
        `<div class="card" style="width: 13rem;">
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
        </div>`

    return pokemonDiv;
}

// function om hoofdletter aan het begin van een woord te plaatsen
function capitalise(word) {
    return word[0].toUpperCase() + word.substring(1);
}

// click event voor search button
searchButton.addEventListener("click", () => {

    // de input van het zoekvak opslaan in constante
    const userInput = searchInput.value.trim();

    // checken of input niet leeg is voordat we fetchen
    if (userInput !== "") {
        // data opvragen van ingetypte naam
        fetch(apiUrl + "pokemon/" + userInput)
            .then(response => {
                if (response.ok) return response.json()
                else throw new Error("Pokémon not found");
            })
            .then(data => {
                // data van pokemon invullen in object
                pokemon.id = data.id;
                pokemon.name = data.name;
                pokemon.image = data.sprites.front_shiny;
                pokemon.types = data.types;
                // card code genereren met gemaakte function
                const pokemonCard = generateInfoDiv();
                // card code toevoegen aan bestaande div
                divPokemonCard.innerHTML = pokemonCard;
            })
            .catch(error => {
                divPokemonCard.textContent = error.message;
            })
    }
})

// event voor keypress van input vakje
// de 'e' kunnen we gebruiken om te weten op welke toets we gedrukt heben
searchInput.addEventListener("keypress", (e) => {
    // enkel uitvoeren als er op enter geduwd wordt
    // als het enter is --> uitvoeren van click code bij button
    if (e.key === "Enter") searchButton.click();
})

// event voor input van input vakje
// als we nu iets kiezen uit de datalist, krijgen we onmiddellijk een resultaat
searchInput.addEventListener("input",() => {
    const userInput = searchInput.value.trim();
    // enkel uitvoeren als de naam effetief in de pokemonNames array zit
    if(pokemonNames.includes(userInput)) searchButton.click();    
})
