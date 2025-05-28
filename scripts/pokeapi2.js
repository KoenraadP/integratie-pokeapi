"use strict";

// standaard endpoint url van de pokemon api in
// constante opslaan
const apiUrl = "https://pokeapi.co/api/v2/";

// HTML elementen binden aan variabelen
const slcPokemonList = document.getElementById("pokemon-list");
const divPokemonImage = document.getElementById("pokemon-image");

// leeg pokemon object maken om later in te vullen
const pokemon = {
    id: "",
    name: "",
    image: "",
    types: []
}

// uitvoeren eerste function om initiële data op te halen
getPokemonData();

function getPokemonData() {
    // endpoint bereiken en data ophalen
    // toevoegen specifieke endpoint die we willen bereiken
    fetch(apiUrl + "pokemon/")
        // wat moet er met het antwoord (response) gebeuren
        .then(response => {
            // data omzetten naar bruikbare json
            // ook controleren of de response wel 'ok' (200 code) is
            if (response.ok) return response.json();
            else throw new Error(response.status);
        })
        // verder werken met de bruikbare data
        .then(data => {
            console.log(data);
            // HTML code voor de select options genereren
            const pokemonList = generatePokemonList(data.results);
            // HTML list toevoegen aan select
            slcPokemonList.innerHTML += pokemonList;
        })
        // als er toch iets fout loopt, opvangen
        .catch(error => {
            console.log(error.message);
        })
}

// option lijst maken met pokemon namen
// de pokemonArray parameter zal moeten ingevuld worden met data.results
function generatePokemonList(pokemonArray) {
    // element om HTML code van options in op te bouwen
    let pokemonList = "";
    // alle namen overlopen in de array en toevoegen als <option>
    pokemonArray.forEach(element => {
        const pokemonName = element.name;
        // toevoegen HTML code aan bestaande string
        pokemonList += `<option value=${pokemonName}>${pokemonName}</option>`;
    });
    // volledige html code als return
    return pokemonList;
}

function generateInfoDiv() {

    const pokemonDiv =
        `<div id="pokemon-info" class="card" style="width: 13rem;">            
            <img src="${pokemon.image}" class="card-img-top">            
            <div class="card-body">
                <p>#${pokemon.id} ${pokemon.name}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Hier komen de types</li>
            </ul>
            </div>
        </div>`;

    return pokemonDiv;
}

// eventlistener voor kiezen van een pokemon uit de select list
// wordt dus uitgevoerd wanneer we een naam uit de lijst kiezen en aanklikken
slcPokemonList.addEventListener("change", () => {
    // data ophalen van gekozen pokemon
    const chosenPokemon = slcPokemonList.value;
    fetch(apiUrl + "pokemon/" + chosenPokemon)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            // nodige data van gekozen pokemon in object opslaan
            pokemon.id = data.id;
            pokemon.name = data.name;
            pokemon.image = data.sprites.front_default;
            pokemon.types = data.types;

            // controleren of er al een div met id pokemon-info bestaat
            // zoja: eerst verwijderen
            const pokemonInfoExists = document.getElementById("pokemon-info");
            if (pokemonInfoExists) pokemonInfoExists.remove();

            // div aanmaken
            const divPokemonInfo = generateInfoDiv();

            // div onder select plaatsen
            slcPokemonList.insertAdjacentHTML("afterend",divPokemonInfo);
        })
})

