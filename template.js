let currentPokemon;
let allPokemon;
let pokemonResults;
let currentChar;
let name;
let type;
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
    name = currentChar["name"];
    type = currentChar["types"][0]["type"]["name"];
    size = currentChar["height"];
    weight = currentChar["weight"];
    moveOne = currentChar["moves"][0]["move"]["name"];
    moveTwo = currentChar["moves"][1]["move"]["name"];
    statHP = currentChar["stats"][0]["stat"]["name"];
    statATT = currentChar["stats"][1]["stat"]["name"];
    statDEF = currentChar["stats"][2]["stat"]["name"];
    statSpecATT = currentChar["stats"][3]["stat"]["name"];
    statSpecDEF = currentChar["stats"][4]["stat"]["name"];
    statSpeed = currentChar["stats"][5]["stat"]["name"];
    valueHP = currentChar["stats"][0]["base_stat"];
    valueATT = currentChar["stats"][1]["base_stat"];
    valueDEF = currentChar["stats"][2]["base_stat"];
    valueSpecAtt = currentChar["stats"][3]["base_stat"];
    valueSpecDEF = currentChar["stats"][4]["base_stat"];
    valueSpeed = currentChar["stats"][5]["base_stat"];
}

function renderPokemonInfoCardTemp() {
    return `<p>Typ: <span class="rightInfoText">${type}</span></p>
    <p>Größe: <span class="rightInfoText">${size * 10} cm</span></p>
    <p>Gewicht: <span class="rightInfoText">${weight / 10} kg</span></p>
    <p>Attacke 1: <span class="rightInfoText">${moveOne}</span></p>
    <p>Attacke 2: <span class="rightInfoText">${moveTwo}</span></p>`;
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
