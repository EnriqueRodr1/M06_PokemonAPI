const URL_POKEMON_BASE = "https://pokeapi.co/api/v2/pokemon/";
const params = new URLSearchParams(window.location.search);
const pokemonName = params.get("name");
const detailsContainer = document.getElementById("details-container");

async function loadPokemonDetails(name) {
  try {
    const response = await fetch(`${URL_POKEMON_BASE}${name}`);
    const pokemon = await response.json();

    let abilitiesTable = `
      <table>
        <tr>
          <th>ID</th>
          <th>Habilidad</th>
        </tr>
    `;
    
    pokemon.abilities.forEach((ability, index) => {
      abilitiesTable += `
        <tr>
          <td>${index + 1}</td>
          <td>${ability.ability.name}</td>
        </tr>
      `;
    });

    abilitiesTable += "</table>";

    const content = `
      <h1>Detalle del Pokémon</h1>
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p>Peso: ${pokemon.weight} | Altura: ${pokemon.height}</p>
      ${abilitiesTable}
    `;

    detailsContainer.innerHTML = content;

  } catch (error) {
    console.error("Error al cargar detalles del Pokémon:", error);
  }
}

document.getElementById("back-btn").onclick = () => {
  window.history.back();
};

loadPokemonDetails(pokemonName);