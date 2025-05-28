"use strict";

// standaard endpoint url van de pokemon api in
// constante opslaan
const apiUrl = "https://pokeapi.co/api/v2/";

// HTML elementen binden aan variabelen
const slcPokemonList = document.getElementById("pokemon-list");

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