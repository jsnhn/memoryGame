/*----- constants -----*/
const POKEMON = [
    {
        name: 'pikachu',
        img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png'
    },
    {
        name: 'jigglypuff',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png'
    },
    {
        name: 'mr-mime',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/122.png'
    },
    {
        name: 'psyduck',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png'
    },
    {
        name: 'jynx',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png'
    },
    {
        name: 'fuecoco',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/909.png'
    },
    {
        name: 'snorlax',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png'
    },
    {
        name: 'ponyta',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png'
    }
]

// not a card for your game, can be used later create a card.

/*----- state variables -----*/
let gameStart = false;

let board, card
/*----- cached elements  -----*/
const bodyEl = document.querySelector('body');
const playBtn = document.createElement('button'); //use the html

/*----- event listeners -----*/
playBtn.addEventListener('click', handleStartClick)

/*----- functions -----*/
render()

function render() {
    if (!gameStart) {
        renderSplash()
    } else {
        renderMain()
    }
};

function renderSplash() {
    const splashPage = document.createElement('div')
    splashPage.id = 'splash'//changing the id
    
    const header = document.createElement('h1')
    header.innerHTML = '<img src="https://fontmeme.com/permalink/240220/4ae8056a49f5eb97f77bb099bc7028ea.png" alt="">'

    const allImgEl = document.createElement('div')
    allImgEl.className = 'all-img'
    POKEMON.forEach(function(poke){
        const imgEl = document.createElement('img')
        imgEl.className = poke.name
        imgEl.src = poke.img
        allImgEl.append(imgEl)
    })
    
    playBtn.id = 'ply-btn'
    playBtn.innerHTML = '<img src="https://fontmeme.com/permalink/240220/938b7d297c1cf42e4f0bf445b23a827e.png" alt="">'

    splashPage.append(header, allImgEl, playBtn)
    console.log(splashPage)

    bodyEl.innerHTML = ''
    bodyEl.append(splashPage)
};


function handleStartClick(){
    gameStart = true;
    render()
};// u need to update all impacted state, and just call the render button

function renderMain() {
    bodyEl.innerHTML = `
        <h1>the game</h1>
    `
    
};