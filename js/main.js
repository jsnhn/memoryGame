/*----- constants -----*/
const POKEMON = [
    { name: 'pikachu',img: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp/220px-Pikachu_artwork_for_Pok%C3%A9mon_Red_and_Blue.webp.png'},
    { name: 'jigglypuff', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png'},
    { name: 'mr-mime', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/122.png'},
    { name: 'psyduck', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png'},
    { name: 'jynx', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/124.png'},
    { name: 'fuecoco', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/909.png'},
    { name: 'snorlax', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png'},
    { name: 'ponyta', img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/077.png'}
]


// not a card for your game, can be used later create a card.

/*----- state variables -----*/
let gameStart = false;

let board, deck

/*----- classes -----*/
class Card {
    constructor(name, img) {
        this.name = name;
        this.img = img; 
        this.isFlipped = false;
    }

    flip() {
        this.isFlipped = !this.isFlipped
    }
}

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
    });
    
    playBtn.id = 'ply-btn'
    playBtn.innerHTML = '<img src="https://fontmeme.com/permalink/240220/938b7d297c1cf42e4f0bf445b23a827e.png" alt="">'

    splashPage.append(header, allImgEl, playBtn)
    console.log(splashPage)

    bodyEl.innerHTML = ''
    bodyEl.append(splashPage)
};


function handleStartClick(){
    gameStart = true;
    deck = shuffleDeck(createDeck()) //createDeck gets invoked first
    render()
};// u need to update all impacted state, and just call the render button

function createDeck(){
    const newDeck = [];


    POKEMON.forEach(function(poke){
       newDeck.push(new Card(poke.name, poke.img))
       newDeck.push(new Card(poke.name, poke.img))
    });

    return newDeck;
}

function shuffleDeck(newDeck) {
    const shuffledDeck = [...newDeck];
    
    for(let i = shuffledDeck.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1))
        const temp = shuffledDeck[i]
        shuffledDeck[i] = shuffledDeck[random]
        shuffledDeck[random] = temp
    }

    return shuffledDeck
}


function renderMain() {
    bodyEl.innerHTML = `
    <div id="row-container">
        <h2 class="timer"><img src="https://fontmeme.com/permalink/240221/3a5350d392655cfb628566cb8ee0b398.png" alt=""></h2>
        <h2 class="turns"><img src="https://fontmeme.com/permalink/240221/d93f51fb2e904bdf5dc8ddf7a0dfe4c4.png" alt=""></h2>
    </div>
   <div id="board-container">
        <div class="box" id="0"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="1"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="2"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="3"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="4"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="5"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="6"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="7"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="8"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="9"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="10"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="11"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="12"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="13"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="14"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
        <div class="box" id="15"><img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU" alt=""></div>
   </div>
    
    `
    
};

