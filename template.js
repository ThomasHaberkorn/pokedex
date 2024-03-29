let currentPokemon;
let nextCurrendPokemonResult;
let allPokemon;
let pokename;
let pokemonResults;
let currentChar;
let name;
let type1;
let type2;
let size;
let weight;
let moveOne;
let moveTwo;
let statHP;
let statATT;
let statDEF;
let statSpecATT;
let statSpecDEF;
let statSpeed;
let valueHP;
let valueATT;
let valueDEF;
let valueSpecAtt;
let valueSpecDEF;
let valueSpeed;
let nextPage;
let GallyPokemonImg;
let imagePath;
let imagePath2;

function initVar() {
    name = currentPokemon["name"];
    type1 = currentPokemon["types"][0]["type"]["name"];
    if (currentPokemon["types"].length >= 2) {
        type2 = currentPokemon["types"][1]["type"]["name"];
    }
    size = currentPokemon["height"];
    weight = currentPokemon["weight"];
    moveOne = currentPokemon["moves"][0]["move"]["name"];
    if (currentPokemon["moves"].length > 1) {
        moveTwo = currentPokemon["moves"][1]["move"]["name"];
    } else {
        moveTwo = "none";
    }
    statHP = currentPokemon["stats"][0]["stat"]["name"];
    statATT = currentPokemon["stats"][1]["stat"]["name"];
    statDEF = currentPokemon["stats"][2]["stat"]["name"];
    statSpecATT = currentPokemon["stats"][3]["stat"]["name"];
    statSpecDEF = currentPokemon["stats"][4]["stat"]["name"];
    statSpeed = currentPokemon["stats"][5]["stat"]["name"];
    valueHP = currentPokemon["stats"][0]["base_stat"];
    valueATT = currentPokemon["stats"][1]["base_stat"];
    valueDEF = currentPokemon["stats"][2]["base_stat"];
    valueSpecAtt = currentPokemon["stats"][3]["base_stat"];
    valueSpecDEF = currentPokemon["stats"][4]["base_stat"];
    valueSpeed = currentPokemon["stats"][5]["base_stat"];
    GallyPokemonImg =
        currentPokemon["sprites"]["other"]["home"]["front_default"];
    imagePath = `img-Type/${type1}IC_LA.png`;
    imagePath2 = `img-Type/${type2}IC_LA.png`;
}

const colors = {
    bug: "#9acd32",
    dark: "#2f4f4f",
    dragon: "#4169e1",
    electric: "#ffd700",
    fairy: "#ff69b4",
    fighting: "#8b4513",
    fire: "#fe5f25",
    flying: "#87ceeb",
    ghost: "#483d8b",
    grass: "#32cd32",
    ground: "#d2b48c",
    ice: "#87cefa",
    normal: "#a9a9a9",
    poison: "#9932cc",
    psychic: "#ff1493",
    rock: "#a0522d",
    steel: "#b0c4de",
    water: "#4169e1",
};

function renderPokemonInfoCardDoubleTemp() {
    return `<p>Typ: <span class="rightInfoText">${type1}</span></p>
    <p>Typ2: <span class="rightInfoText">${type2}</span></p>
    <p>Größe: <span class="rightInfoText">${size * 10} cm</span></p>
    <p>Gewicht: <span class="rightInfoText">${weight / 10} kg</span></p>
    <p>Attacke 1: <span class="rightInfoText">${moveOne}</span></p>
    <p>Attacke 2: <span class="rightInfoText">${moveTwo}</span></p>`;
}

function renderPokemonInfoCardTemp() {
    return `<p>Typ: <span class="rightInfoText">${type1}</span></p>
    <p>Größe: <span class="rightInfoText">${size * 10} cm</span></p>
    <p>Gewicht: <span class="rightInfoText">${weight / 10} kg</span></p>
    <p>Attacke 1: <span class="rightInfoText">${moveOne}</span></p>
    <p>Attacke 2: <span class="rightInfoText">${moveTwo}</span></p>`;
}

function renderPokemonHeadCardSingleColor(i) {
    document.getElementById(
        "pokedex"
    ).style.background = `linear-gradient(135deg, ${colors[type1]} 40%, ${colors[type1]} 60%)`;
    return `
        <img src="img/left.png" class="previousCard switchCard" onclick="previousCard(${i})">
        <img src="${currentPokemon["sprites"]["other"]["home"]["front_default"]}" id="cardImage">
        <img src="img/right.png" class="nextCard switchCard" onclick="nextCard(${i})">
        `;
}

function renderPokemonHeadCardDoubleColor(i) {
    document.getElementById(
        "pokedex"
    ).style.background = `linear-gradient(135deg, ${colors[type1]} 40%, ${colors[type2]} 60%)`;
    return `
        <img src="img/left.png" class="previousCard switchCard" onclick="previousCard(${i})">
        <img src="${currentPokemon["sprites"]["other"]["home"]["front_default"]}" id="cardImage">
        <img src="img/right.png" class="nextCard switchCard" onclick="nextCard(${i})">
    `;
}

function renderDoubleTypeTemp(i) {
    return `
    <div class="galleryCard" id="galleryCard(${i})" style="background: linear-gradient(135deg, ${colors[type1]} 40%, ${colors[type2]} 60%)" onclick="openMainCard(${i})">
    <div class="galleryCardHead">${name}</div>
    <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"></div>
    <div class="typeBox" id="typeBox">
        <img src="${imagePath}" class="typeBoxImg">
        <img src="${imagePath2}" class="typeBoxImg">
    </div>
    `;
}

function renderSingleTypesTemp(i) {
    return `
    <div class="galleryCard" id="galleryCard(${i})" style="background-color: ${colors[type1]}" onclick="openMainCard(${i})">
    <div class="galleryCardHead">${name}</div>
    <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"></div>
    <div class="typeBox" id="typeBox">
        <img src="${imagePath}" class="typeBoxImg">
    </div>
    `;
}

function closeChart() {
    const ctx = document.getElementById("myChart");
    if (ctx) {
        let chartInstance = Chart.getChart(ctx);
        if (chartInstance) {
            chartInstance.destroy();
        }
    }
}

function filterPokemonInput(input) {
    emptyGally();
    let inputPoke = input.toLowerCase();
    pokemonCopy = pokemons.slice();
    pokemonResults.splice(0, pokemonResults.length);

    for (let i = 0; i < pokemonCopy.length; i++) {
        if (pokemonCopy[i]["name"].includes(inputPoke)) {
            pokemonResults.push(pokemonCopy[i]);
        }
    }
    renderGallerySearch(pokemonResults);
}

function renderGallerySearch(a) {
    a = pokemonResults;
    for (i = 0; i < pokemonResults.length; i++) {
        let poke = pokemonResults[i];
        checkTypeLength(poke, i);
    }
}

// --------- kleinbuchstaben zu groß
function capFirst(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function emptyGally() {
    document.getElementById("gallery").innerHTML = "";
}

function resetGally() {
    emptyGally();
    pokemonResults = pokemonCopy.slice();
}

function showPokeStats() {
    document.getElementById("pokemonInformation").classList.add("d-none");
    document.getElementById("pokemonStats").classList.remove("d-none");
}

function showPokeInfo() {
    document.getElementById("pokemonStats").classList.add("d-none");
    document.getElementById("pokemonInformation").classList.remove("d-none");
}

function closeCard() {
    document.getElementById("pokemonMainCard").classList.add("d-none");
    closeChart();
}
