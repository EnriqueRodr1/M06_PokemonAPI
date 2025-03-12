const URL_POKEMON_BASE = "https://pokeapi.co/api/v2/pokemon";
const pokemonContainer = document.getElementById("pokemon-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const limitSelector = document.getElementById("result-count");

let currentOffset = 0;
let currentLimit = parseInt(limitSelector.value);

document.addEventListener("DOMContentLoaded", () => {
  getPokemons(currentLimit, currentOffset);
});

async function getPokemons(limit = 10, offset = 0) {
  try {
    const response = await fetch(`${URL_POKEMON_BASE}?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    displayPokemons(data.results);
    updatePaginationButtons(data.count, limit);
  } catch (error) {
    console.error("Error al cargar Pokémons:", error);
  }
}

async function displayPokemons(pokemons) {
  pokemonContainer.innerHTML = "";
  for (const pokemon of pokemons) {
    await fetchPokemonDetails(pokemon.url);
  }
}

async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.classList.add("pokemon-img");

    const name = document.createElement("h3");
    name.textContent = pokemon.name;

    const button = document.createElement("button");
    button.textContent = "Detalle";
    button.onclick = () => {
      window.location.href = `detail.html?name=${pokemon.name}`;
    };

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(button);

    pokemonContainer.appendChild(card);
  } catch (error) {
    console.error("Error cargando detalle:", error);
  }
}

function updatePaginationButtons(totalCount, limit) {
  prevBtn.disabled = currentOffset === 0;
  nextBtn.disabled = currentOffset + limit >= totalCount;
}

prevBtn.addEventListener("click", () => {
  if (currentOffset >= currentLimit) {
    currentOffset -= currentLimit;
    getPokemons(currentLimit, currentOffset);
  }
});

nextBtn.addEventListener("click", () => {
  currentOffset += currentLimit;
  getPokemons(currentLimit, currentOffset);
});

limitSelector.addEventListener("change", () => {
  currentLimit = parseInt(limitSelector.value);
  currentOffset = 0; 
  getPokemons(currentLimit, currentOffset);
});