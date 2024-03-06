let pokemons = [];

async function loadPokemon() {
    let url =
        "https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}";
    let respone = await fetch(url);
    currentPokemon = await respone.json();
    pokemonResults = currentPokemon["results"];
    // console.log("All Pokemon", currentPokemon);
    // console.log(pokemonResults);
    nextPage = currentPokemon["next"];

    renderGallery();
}

async function renderGallery() {
    for (let i = 0; i < pokemonResults.length; i++) {
        let pokename = pokemonResults[i]["name"];
        let pokeUrl = pokemonResults[i]["url"];
        let response = await fetch(pokeUrl);
        let GallyPokemon = await response.json();
        let GallyPokemonImg =
            GallyPokemon["sprites"]["other"]["home"]["front_default"];
        // console.log(GallyPokemon);
        if (GallyPokemon["types"].length >= 2) {
            let GallyPokeType = GallyPokemon["types"][0]["type"]["name"];
            let GallyPokeType2 = GallyPokemon["types"][1]["type"]["name"];
            let imagePath = `img-Type/${GallyPokeType}IC_LA.png`;
            let imagePath2 = `img-Type/${GallyPokeType2}IC_LA.png`;
            document.getElementById("gallery").innerHTML += `
            <div class="galleryCard" id="galleryCard(${i})" onclick="openMainCard(${i})">
            <div class="galleryCardHead">${pokename}</div>
            <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"</div>
            <div class="typeBox" id="typeBox">
            <img src="${imagePath}" class="typeBoxImg">
            <img src="${imagePath2}" class="typeBoxImg">
            </div>
            `;
            // console.log(GallyPokeType);
        } else {
            let GallyPokeType = GallyPokemon["types"][0]["type"]["name"];
            let imagePath = `img-Type/${GallyPokeType}IC_LA.png`;
            document.getElementById("gallery").innerHTML += `
            <div class="galleryCard" id="galleryCard(${i})" onclick="openMainCard(${i})">
            <div class="galleryCardHead">${pokename}</div>
            <div class="galleryCardImgBox"><img src="${GallyPokemonImg}" class="galleryCardImg"</div>
            <div class="typeBox" id="typeBox">
            <img src="${imagePath}" class="typeBoxImg">
            
            </div>
            `;
        }
    }
}

// async function loadPokemon() {
//     let url = "https://pokeapi.co/api/v2/pokemon/charmander";
//     let respone = await fetch(url);
//     currentPokemon = await respone.json();

//     console.log("Loaded Pokemon", currentPokemon);
//     initVar();
//     renderPokemonHeadCard();
//     renderChart();
//     renderPokemonInfoCard(name, type, size, weight, moveOne, moveTwo);
// }

async function openMainCard(i) {
    document.getElementById("pokemonMainCard").classList.remove("d-none");
    let charUrl = currentPokemon["results"][i]["url"];
    let charResponse = await fetch(charUrl);
    currentChar = await charResponse.json();
    console.log(currentChar);
    initVar();
    renderPokemonHeadCard(i);
    renderPokemonInfoCard(name, type, size, weight, moveOne, moveTwo);
    renderChart();
}

function renderPokemonHeadCard(i) {
    document.getElementById("pokemonName").innerHTML =
        currentPokemon["results"][i]["name"];
    document.getElementById("cardImage").src =
        currentChar["sprites"]["other"]["home"]["front_default"];
}

function renderPokemonInfoCard(i) {
    document.getElementById("pokemonInformation").innerHTML =
        renderPokemonInfoCardTemp(i);
    console.log(name, type, size * 10, weight / 10, moveOne, moveTwo);
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

function nextCard(i) {
    i++;
    closeChart();
    renderPokemonHeadCard(i);
    renderPokemonInfoCard(i);
}
