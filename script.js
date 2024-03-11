let pokemons = [];
let offset = "";
pokemonResults = "";
let mainUrl = "https://pokeapi.co/api/v2/pokemon?offset=20";

async function loadPokemon() {
    let respone = await fetch(mainUrl);
    currentPokemon = await respone.json();
    pokemons = currentPokemon["results"];
    nextPage = currentPokemon["next"];
    bufferPokemons();
    await renderGalleryTest();
}

// Puffert die nächsten 20 Pokemon ins Array, stellt sie aber noch nicht dar
async function bufferPokemons() {
    let respone = await fetch(nextPage);
    currentPokemon = await respone.json();
    pokemonResults = currentPokemon["results"];
    for (i = 0; i < pokemonResults.length; i++) {
        let pokepush = pokemonResults[i];
        pokemons.push(pokepush);
    }
    console.log("next1", nextPage);
    nextPage = currentPokemon["next"];
}

// lädt die nächsten 20 Pokemon in die Gallerie und puffert wieder die Nachfolgenden 20 Pokemon ins Array
async function loadMorePokemon() {
    console.log("1", nextPage);
    for (i = pokemons.length - 20; i < pokemons.length; i++) {
        let poke = pokemons[i];
        await checkTypeLength(poke, i);
    }
    let respone = await fetch(nextPage);
    currentPokemon = await respone.json();
    pokemonResults = currentPokemon["results"];
    for (i = 0; i < pokemonResults.length; i++) {
        let pokepush = pokemonResults[i];
        pokemons.push(pokepush);
    }
    nextPage = currentPokemon["next"];
    console.log("2", nextPage);
}

async function renderMorePokeToGallery() {
    for (i = pokemons.length - 20; i < pokemons.lengt; i++) {
        await checkTypeLength();
    }
}

async function renderGalleryTest() {
    for (i = 0; i < pokemons.length; i++) {
        let poke = pokemons[i];
        checkTypeLength(poke, i);
    }
}

async function checkTypeLength(a, index) {
    let i = index;
    let checkUrl = a["url"];
    let respone = await fetch(checkUrl);
    currentPokemon = await respone.json();
    if (currentPokemon["types"].length >= 2) {
        await renderDoubleTypes(i);
    } else {
        await renderSingleTypes(i);
    }
}

// rendert Pokemon mit 2 Typen in die Gallerie
async function renderDoubleTypes(index) {
    initVar();
    let i = index;
    name = capFirst(currentPokemon["name"]);
    document.getElementById("gallery").innerHTML += `
                <div class="galleryCard" id="galleryCard(${i})" style="background: linear-gradient(135deg, ${colors[type1]} 40%, ${colors[type2]} 60%)" onclick="openMainCard(${i})">
                <div class="galleryCardHead">${name}</div>
                <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"</div>
                <div class="typeBox" id="typeBox">
                <img src="${imagePath}" class="typeBoxImg">
                <img src="${imagePath2}" class="typeBoxImg">
                </div>
                `;
}

// rendert Pokemon mit einem Typ in die Gallerie
async function renderSingleTypes(index) {
    let i = index;
    initVar();
    name = capFirst(currentPokemon["name"]);
    document.getElementById("gallery").innerHTML += `
                <div class="galleryCard" id="galleryCard(${i})" style="background-color: ${colors[type1]}" onclick="openMainCard(${i})">
                <div class="galleryCardHead">${name}</div>
                <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"</div>
                <div class="typeBox" id="typeBox">
                <img src="${imagePath}" class="typeBoxImg">
                </div>
                `;
}

// öffnet und rendert eine Pokemon-Karte
async function openMainCard(i) {
    document.getElementById("pokemonMainCard").classList.remove("d-none");
    document.getElementById("pokedex").classList = "";
    let charUrl = pokemons[i]["url"];
    let charResponse = await fetch(charUrl);
    currentPokemon = await charResponse.json();
    console.log(currentPokemon);
    initVar();
    renderPokemonHeadCard(i);

    // rendert den Infoteil der Pokemon-Karte
    if (currentPokemon["types"].length >= 2) {
        document.getElementById("pokemonInformation").innerHTML =
            renderPokemonInfoCardDoubleTemp(i);
    } else {
        document.getElementById("pokemonInformation").innerHTML =
            renderPokemonInfoCardTemp(i);
    }

    // initialisiert das Chart
    renderChart();
}

// rendert den oberen Teil der Pokemon-Karte
function renderPokemonHeadCard(i) {
    name = capFirst(currentPokemon["name"]);
    document.getElementById("pokemonName").innerHTML = name;

    if (currentPokemon["types"].length >= 2) {
        document.getElementById("pokemonImage").innerHTML =
            renderPokemonHeadCardDoubleColor(i);
    } else {
        document.getElementById("pokemonImage").innerHTML =
            renderPokemonHeadCardSingleColor(i);
    }
}

function nextCard(i) {
    document.getElementById("pokedex").classList = "";
    if (i >= pokemons.length - 21) {
        i = -1;
    }
    i++;
    closeChart();
    openMainCard(i);
}

function previousCard(i) {
    document.getElementById("pokedex").classList = "";
    if (i == 0) {
        i = pokemons.length - 21;
        closeChart();
        openMainCard(i);
    } else {
        i--;
        closeChart();
        openMainCard(i);
    }
}

// // -------- Pokemon-Suche
let pokemonCopy = "";
function filterPokemon() {
    let input = document.getElementById("input").value;

    if (input === "") {
        console.log("leer");
        resetGally();
        renderGalleryTest();
    } else if (input.length >= 3) {
        filterPokemonInput(input);
    }

    function filterPokemonInput(input) {
        emptyGally();

        pokemonCopy = pokemons.slice();
        pokemonResults.splice(0, pokemonResults.length);
        console.log(pokemonCopy);

        for (let i = 0; i < pokemonCopy.length; i++) {
            if (pokemonCopy[i]["name"].includes(input)) {
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
}
console.log("pokeResOut", pokemonResults);
