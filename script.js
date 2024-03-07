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
        // pokename = pokemonResults[i]["name"];
        pokename = capFirst(currentPokemon["results"][i]["name"]);
        let pokeUrl = pokemonResults[i]["url"];
        let response = await fetch(pokeUrl);
        let GallyPokemon = await response.json();
        let GallyPokemonImg =
            GallyPokemon["sprites"]["other"]["home"]["front_default"];
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
            gallyCardColor(
                GallyPokemon["types"][0]["type"]["name"],
                "galleryCard",
                i
            );
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
            gallyCardColor(
                GallyPokemon["types"][0]["type"]["name"],
                "galleryCard",
                i
            );
        }
    }
}

async function openMainCard(i) {
    document.getElementById("pokemonMainCard").classList.remove("d-none");
    document.getElementById("pokedex").classList = "";
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
    let name = capFirst(currentPokemon["results"][i]["name"]);
    document.getElementById("pokemonName").innerHTML = name;
    document.getElementById("pokemonImage").innerHTML = `
        <img src="img/left.png" class="previousCard switchCard" onclick="previousCard(${i})">
        <img src="${currentChar["sprites"]["other"]["home"]["front_default"]}" id="cardImage">
        <img src="img/right.png" class="nextCard switchCard" onclick="nextCard(${i})">
        `;
    CardColor(currentChar["types"][0]["type"]["name"], "pokedex");
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
    document.getElementById("pokedex").classList = "";
    if (i >= pokemonResults.length - 1) {
        i = -1;
    }
    i++;
    closeChart();
    openMainCard(i);
}

function previousCard(i) {
    document.getElementById("pokedex").classList = "";
    if (i == 0) {
        i = pokemonResults.length - 1;
        closeChart();
        openMainCard(i);
    } else {
        i--;
        closeChart();
        openMainCard(i);
    }
}

async function loadMorePokemon() {
    console.log(nextPage);
    let nextResponse = await fetch(nextPage);
    let nextCurrendPokemon = await nextResponse.json();
    nextCurrendPokemonResult = nextCurrendPokemon["results"];
    pushNextPokemon();
    console.log(nextCurrendPokemon);
    // console.log(pokemonResults);
    document.getElementById("gallery").innerHTML = "";
    renderGallery();
    nextPage = nextCurrendPokemon["next"];
    console.log(nextPage);
}

function pushNextPokemon() {
    for (let i = 0; i < nextCurrendPokemonResult.length; i++) {
        const nextPoke = nextCurrendPokemonResult[i];
        pokemonResults.push(nextPoke);
    }
}

// -------- input - mal schauen

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input").addEventListener("input", performSearch);

    function performSearch() {
        if (this.value.length < 3) return;
        // search code
    }
});

// --------- kleinbuchstaben zu groß
function capFirst(s) {
    return s[0].toUpperCase() + s.slice(1);
}

// Listener für Eingabefeld Suchfuntkion
// document.getElementById('pokemonSearchInput').addEventListener('input', function () {
//     const searchQuery = this.value.toLowerCase();
//     const pokemonItems = document.querySelectorAll('.pokemon-item');

//     pokemonItems.forEach(function (item) {
//         const pokemonName = item.textContent.toLowerCase();
//         if (pokemonName.includes(searchQuery)) {
//             item.style.display = '';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// });

// document.getElementById('prevPokemon').addEventListener('click', loadPreviousPokemon);
// document.getElementById('nextPokemon').addEventListener('click', loadNextPokemon);
// buttons.forEach(button => {
//     button.addEventListener('click', toggleActiveState);
// });

// document.getElementById('loadMore').addEventListener('click', function () {
//     loadInitialPokemons(true);
// });

// window.onclick = function (event) {
//     let modal = document.getElementById('pokemonModal');
//     if (event.target == modal) {
//         closeModal();
//     }
// }
