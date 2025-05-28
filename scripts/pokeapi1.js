"use strict";

// standaard endpoint url van de pokemon api in
// constante opslaan
const apiUrl = "https://pokeapi.co/api/v2/";

// HTML elementen binden aan variabelen
const divPokemonList = document.getElementById("pokemon-list");

// endpoint bereiken en data ophalen
// toevoegen specifieke endpoint die we willen bereiken
fetch(apiUrl + "pokemon/?limit=1025")
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
        // HTML code voor pokemonlist laten maken
        const pokemonList = generatePokemonList(data.results);
        // HTML list toevoegen aan div
        divPokemonList.innerHTML = pokemonList;
    })
    // als er toch iets fout loopt, opvangen
    .catch(error => {
        console.log(error.message);
    })

// ordered list maken met pokemon namen
// de pokemonArray parameter zal moeten ingevuld worden met data.results
function generatePokemonList(pokemonArray){
    // element om HTML code van list in op te bouwen
    let pokemonList = "<ol>";
    // alle namen overlopen in de array en toevoegen als list items <li> 
    pokemonArray.forEach(element => {
        // naam capitalisen
        const pokemonName = capitalise(element.name);
        // toevoegen HTML code aan bestaande string
        pokemonList += `<li>${pokemonName}</li>`
    });
    // lijst afsluiten
    pokemonList += "</ol>";
    // volledige html code als return
    return pokemonList;
}

// function om een woord te 'capitalisen' (eerste letter hoofdletter)
function capitalise(word) {
    // een string is eigenlijk ook een array van characters
    return word[0].toUpperCase() + word.substring(1);
}
