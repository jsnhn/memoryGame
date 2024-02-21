/*----- constants -----*/



/*----- state variables -----*/
let gameStart = false;

/*----- cached elements  -----*/
const bodyEl = document.querySelector('body');


/*----- event listeners -----*/
// document.getElementById('ply-btn').addEventListener('click', handleStartClick)

/*----- functions -----*/
render()

function render() {
    if (!gameStart) {
        renderSplash()
    }
};

function renderSplash() {
    bodyEl.innerHTML = `
        <div id="splash">
            <h1><img src="https://fontmeme.com/permalink/240220/4ae8056a49f5eb97f77bb099bc7028ea.png" alt=""></h1>
            <div class="all-img">
                <img class="pikachu" src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png">
                <img class="jigglypuff" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png">
                <img class="mr-mime" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/122.png" alt="">
                <img class="psyduck" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png" alt="">
                <img class="jynx" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png" alt="">
                <img class="fuecoco" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/909.png" alt="">
                <img class="snorlax" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png" alt="">
                <img class="ponyta" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png" alt="">
            </div>
            <button id="ply-btn"><img src="https://fontmeme.com/permalink/240220/938b7d297c1cf42e4f0bf445b23a827e.png" alt=""></button>
        </div>
    `
    document.getElementById('ply-btn').addEventListener('click', handleStartClick);
};


function handleStartClick(){
    renderMain()
};

function renderMain() {
    bodyEl.innerHTML = `
        <h1>the game</h1>
    `
    
};