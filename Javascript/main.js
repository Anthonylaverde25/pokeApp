document.addEventListener("DOMContentLoaded", (e) => {
  let imagePokemon = document.querySelector(".currentImg");
  let namePokemon = document.querySelector(".name");
  let heightPokemon = document.querySelector("#heigth");
  let weightPokemon = document.querySelector("#weigth");
  let typeOf = document.querySelector("#type");
  let abilitiesPokemon = document.querySelector("#abilities");
  let imageType = document.querySelector(".typeImage-contend");
  let input = document.querySelector("#searchId");
  let form = document.querySelector(".form");
  let loaderOverlay = document.querySelector(".overlay__loader");
  let idRender = document.querySelector("#id");
  let id = 1;

  const spinner = () => {
    loaderOverlay.classList.add("show");
  };

  const hideSpinner = () => {
    loaderOverlay.classList.remove("show");
  };

  form.addEventListener("click", (e) => {
    e.preventDefault();
    input.addEventListener("change", (e) => {
      id = e.target.value;
      getPokemonByid(id);
      input.value = "";
    });
  });

  const pokemonTypes = {
    normal: {
      name: "Normal",
      color: "#A8A878",
      src: "image/iconsPoke/normal.svg",
    },
    fire: {
      name: "Fire",
      color: "#F08030",
      src: "image/iconsPoke/fire.svg",
    },
    water: {
      name: "Water",
      color: "#6890F0",
      src: "image/iconsPoke/water.svg",
    },
    grass: {
      name: "Grass",
      color: "#78C850",
      src: "image/iconsPoke/grass.svg",
    },
    electric: {
      name: "Electric",
      color: "#F8D030",
      src: "image/iconsPoke/electric.svg",
    },
    ice: {
      name: "Ice",
      color: "#98D8D8",
      src: "image/iconsPoke/ice.svg",
    },
    fighting: {
      name: "Fighting",
      color: "#C03028",
      src: "image/iconsPoke/fighting.svg",
    },
    poison: {
      name: "Poison",
      color: "#A040A0",
      src: "image/iconsPoke/poison.svg",
    },
    ground: {
      name: "Ground",
      color: "#E0C068",
      src: "image/iconsPoke/ground.svg",
    },
    flying: {
      name: "Flying",
      color: "#A890F0",
      src: "image/iconsPoke/flying.svg",
    },
    psychic: {
      name: "Psychic",
      color: "#F85888",
      src: "image/iconsPoke/psychic.svg",
    },
    bug: {
      name: "Bug",
      color: "#A8B820",
      src: "image/iconsPoke/bug.svg",
    },
    rock: {
      name: "Rock",
      color: "#B8A038",
      src: "image/iconsPoke/rock.svg",
    },
    ghost: {
      name: "Ghost",
      color: "#705898",
      src: "image/iconsPoke/ghost.svg",
    },
    dragon: {
      name: "Dragon",
      color: "#7038F8",
      src: "image/iconsPoke/dragon.svg",
    },
    dark: {
      name: "Dark",
      color: "#705848",
      src: "image/iconsPoke/dark.svg",
    },
    steel: {
      name: "Steel",
      color: "#B8B8D0",
      src: "image/iconsPoke/steel.svg",
    },
    fairy: {
      name: "Fairy",
      color: "#EE99AC",
      src: "image/iconsPoke/fairy.svg",
    },
  };

  async function getPokemonByid(pokeID) {
    try {
      const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`;
      spinner();
      // TRAE LA RESPUESTA COMPLETA, ES DECIR UNA RESPUESTA HTTP QUE INCLUYE LA INFORMACION DEL HEADER Y DEL BODY DE LA SOLICITUD
      const response = await fetch(apiURL);

      if (!response.ok)
        throw new Error(`error al consultar la PokeApi ${response.status}`);
      // AL COMPLETAR LA SOLICITUD SE EJECUTA Y LEE EL CONTENIDO jSON DEL BODY DE LA RESPUESTA. ESTE JSON SE ANALIZA Y SE CONVIERTE EN UN OBJETO. DE LO CONTRARIO SOLO SE ESTARIA TRABAJANDO CON LA RESPUESTA HTTP
      const data = await response.json();
      hideSpinner();
      renderPokemon(data);
    } catch (error) {
      console.log(error);
      hideSpinner();
    }
  }

  const renderPokemon = (data) => {
    const { name, height, weight, abilities, sprites, types, id } = data;
    console.log(types);

    const urlImage = data.sprites.other.dream_world.front_default;
    const principalType = data.types[0].type.name;
    namePokemon.textContent = `${name}`;
    heightPokemon.textContent = `${height / 10}M`;
    weightPokemon.textContent = `${weight / 10}Kg`;
    abilitiesPokemon.textContent = `${abilities[0].ability.name}`;
    typeOf.textContent = `${principalType}`;
    imagePokemon.src = `${urlImage}`;
    idRender.textContent = `#${id}`;

    const body = document.body;

    if (pokemonTypes[principalType]) {
      const backgroundColor = pokemonTypes[principalType.toLowerCase()].color;
      body.style.backgroundColor = `${backgroundColor}`;
      const typeImg = pokemonTypes[principalType].src;
      imageType.src = `${typeImg}`;
      console.log(imageType.src);
    }
  };

  getPokemonByid(id);
});
