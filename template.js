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

let bug = "src='img/Bug_IC_LA.png'";
let dark = "src='img/Dark_IC_LA.png'";
let dragon = "src='img/Dragon_IC_LA.png'";
let electric = "src='img/Electric_IC_LA.png'";
let fairy = "src='img/Fairy_IC_LA.png'";
let fighting = "src='img/Fighting_IC_LA.png'";
let fire = "src='img/Fire_IC_LA.png'";
let flying = "src='img/Flying_IC_LA.png'";
let ghost = "src='img/Ghost_IC_LA.png'";
let grass = "src='img/Grass_IC_LA.png'";
let ground = "src='img/Ground_IC_LA.png'";
let ice = "src='img/Ice_IC_LA.png'";
let normal = "src='img/Normal_IC_LA.png'";
let poison = "src='img/Poison_IC_LA.png'";
let psychic = "src='img/Psychic_IC_LA.png'";
let rock = "src='img/Rock_IC_LA.png'";
let steel = "src='img/Steel_IC_LA.png'";
let water = "src='img/Water_IC_LA.png'";

function initVar() {
    name = currentPokemon["name"];
    type1 = currentPokemon["types"][0]["type"]["name"];
    if (currentPokemon["types"].length >= 2) {
        type2 = currentPokemon["types"][1]["type"]["name"];
    }
    size = currentPokemon["height"];
    weight = currentPokemon["weight"];
    moveOne = currentPokemon["moves"][0]["move"]["name"];
    moveTwo = currentPokemon["moves"][1]["move"]["name"];
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
    return `<img src="img/left.png" class="previousCard switchCard" onclick="previousCard(${i})">
        <img src="${currentPokemon["sprites"]["other"]["home"]["front_default"]}" id="cardImage">
        <img src="img/right.png" class="nextCard switchCard" onclick="nextCard(${i})">
        `;
}

function renderPokemonHeadCardDoubleColor(i) {
    document.getElementById(
        "pokedex"
    ).style.background = `linear-gradient(135deg, ${colors[type1]} 40%, ${colors[type2]} 60%)`;
    return `<img src="img/left.png" class="previousCard switchCard" onclick="previousCard(${i})">
        <img src="${currentPokemon["sprites"]["other"]["home"]["front_default"]}" id="cardImage">
        <img src="img/right.png" class="nextCard switchCard" onclick="nextCard(${i})">
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
