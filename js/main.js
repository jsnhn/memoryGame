//*----- constants -----*/
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

//* not a card for your game, can be used later create a card.

//*----- state variables -----*/
let gameStart = false;

let currentTimer = 0;

let deck, firstPick, winner, turns, timer

//*----- classes -----*/
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

//*----- cached elements  -----*/
const bodyEl = document.querySelector('body');
const playBtn = document.createElement('button'); //* use the html
const boardEl = document.createElement('div');
const rstBtn = document.createElement('button')



//*----- event listeners -----*/
playBtn.addEventListener('click', handleStartClick)
boardEl.addEventListener('click', handleClick)
rstBtn.addEventListener('click', handleStartClick)


//*----- functions -----*/
render()

function render() {
    if (!gameStart) {
        renderSplash()
    } else if (winner) {
       renderWinnerPage()
    } else {
        renderMain()
    }
};

function renderSplash() {
    const splashPage = document.createElement('div')
    splashPage.id = 'splash'//* changing the id
    
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
    
    bodyEl.innerHTML = ''
    bodyEl.append(splashPage)
};

function handleStartClick(){
    gameStart = true;
    firstPick = null;
    winner = false;
    turns = 0;
    currentTimer = 0;
    deck = shuffleDeck(createDeck()) //* createDeck gets invoked first
    render()
    startTime() //* after the elements have been rendered in the DOM.  .timer element is present in the DOM before trying to access it in the startTime() function.
};//* u need to update all impacted state, and just call the render button

function handleClick(e) {
    const clickedCardIndex = e.target.id; //* always console log 
    const clickedCard = deck[clickedCardIndex] //* card class instance - object created from a class
    console.log(clickedCard)
    
    if (!clickedCard || clickedCard.isFlipped) return; //* clickedCard was a valid card, so you can check isFlipped property
        
        clickedCard.flip()
        
        if (firstPick) { //* only if it is true, but firstpick null
            turns++
            console.log('this is second pick ')
            const match = checkCards(firstPick, clickedCard) //* do the cards match or not?
            
            if(!match){
                boardEl.removeEventListener('click', handleClick)
                setTimeout(function(){
                    clickedCard.flip()
                    firstPick.flip()
                    firstPick = null //* youre done comparing the 2
                    boardEl.addEventListener('click', handleClick)
                    render()
                }, 1000)
            } else {
                firstPick = null
                winner = checkWinner()
            }
        } else {
            console.log('this is first pick ')
            firstPick = clickedCard
    }
    render() 
}

function startTime () {
    timer = setInterval(function(){
        currentTimer++
        render() //* the render display function is already handling displaying the time.
    }, 1000)
}

function checkWinner() {
    const allCardsFlipped = deck.every(function(card){
       return card.isFlipped
    }) 

        if (allCardsFlipped) {
            clearInterval(timer)
            return true
        } else {
            return false;
        }
//TODO have this function return true when the game is won or false otherwise.
};

function renderWinnerPage() {
    const winnerPage = document.createElement('div')
    winnerPage.id = 'winner'
    
    const header = document.createElement('h1')
    header.innerHTML = '<img src="https://fontmeme.com/permalink/240228/1471d08b990f0ad5408f18efebb9de45.png" alt="">'
    
    const allImgEl = document.createElement('div')
    allImgEl.className = 'all-img'
    POKEMON.forEach(function(poke){
        const imgEl = document.createElement('img')
        imgEl.className = poke.name
        imgEl.src = poke.img
        allImgEl.append(imgEl)
    });

    const winTime = document.createElement('div');
    winTime.id = 'winnerTimer';

    const winContent = document.createElement('div');
    winContent.className = 'win-content'
    winContent.innerHTML = `<img src="https://fontmeme.com/permalink/240221/3a5350d392655cfb628566cb8ee0b398.png" alt="">${currentTimer}</img>`

    winTime.appendChild(winContent)

    rstBtn.id = 'rst-btn'
    rstBtn.innerHTML = '<img src="https://fontmeme.com/permalink/240228/8926cac3a56e8ab22c7edd1b8c8f8710.png" alt="">'

    winnerPage.append(header, allImgEl, rstBtn, winTime)
    
    bodyEl.innerHTML = ''
    bodyEl.append(winnerPage)
}

function checkCards(card1, card2) {
    return card1.name === card2.name;
//    if (card1.name === card2.name) {
//         return true;
//    } else {
//         return false;
//    }
}


function createDeck(){
    const newDeck = [];

    POKEMON.forEach(function(poke){
       newDeck.push(new Card(poke.name, poke.img)) //* instanstiating the class to create card instances
       newDeck.push(new Card(poke.name, poke.img))
    });

    return newDeck;
};
//! no longer in use
// function shuffleDeck(newDeck) {
//     const shuffledDeck = [];
    
//     for(let i = newDeck.length - 1; i > 0; i--) {
//         const random = Math.floor(Math.random() * (i + 1))
//         const temp = newDeck[i]
//         newDeck[i] = newDeck[random]
//         newDeck[random] = temp
//     }

//     return shuffledDeck
// } 

//* the idea with what i'm having you do is you dont want to change the incoming data 
//* but you're creating a new shuffled deck based off the incoming one

function shuffleDeck(newDeck) {
    const shuffledDeck = [...newDeck];
    
    for(let i = shuffledDeck.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1))
        const temp = shuffledDeck[i]
        shuffledDeck[i] = shuffledDeck[random]
        shuffledDeck[random] = temp
    };

    return shuffledDeck;
};

function renderBoard() {
    boardEl.id = 'board-container'

    deck.forEach(function(card, index){
        const boxEl = document.createElement('div')
        boxEl.classList = 'box'
        boxEl.id = index
        
        const imgEl = document.createElement('img')

        if(card.isFlipped) {
            imgEl.src = card.img
        } else {
            imgEl.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ecb7ae-7059-48df-a4f8-2e3fb7858606/d47rmjf-de88a574-49c8-4dcf-9df4-7e11722e8bec.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyZWNiN2FlLTcwNTktNDhkZi1hNGY4LTJlM2ZiNzg1ODYwNlwvZDQ3cm1qZi1kZTg4YTU3NC00OWM4LTRkY2YtOWRmNC03ZTExNzIyZThiZWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.loswJAzDdppbY9aZ-eQs3DKvAdY7W91eosZhapx7gFU"
        };
       
        boxEl.append(imgEl)
        boardEl.append(boxEl)

        // boxEl.addEventListener('click', handleClick) - dont do this. the parent is boardEl
        
    });
};

function createDisplay(){
    const displayContainer = document.createElement('div')
    displayContainer.id = 'display-container'
    
    const timerEl = document.createElement('div');
    timerEl.className = 'timer'

    const timerContent = document.createElement('div');
    timerContent.className = 'timer-content'
    timerContent.innerHTML = `<img src="https://fontmeme.com/permalink/240221/3a5350d392655cfb628566cb8ee0b398.png" alt="">${currentTimer}</img>` //change this later to a text, or dont use h2

    timerEl.appendChild(timerContent);

    const turnsEl = document.createElement('div');
    turnsEl.className = 'turns'

    const turnsContent = document.createElement('div');
    turnsContent.className = 'turns-content'
    turnsContent.innerHTML = `<img src="https://fontmeme.com/permalink/240221/d93f51fb2e904bdf5dc8ddf7a0dfe4c4.png" alt="">${turns}</img>`; //* be sure to wrap the whole line in backticks. this is an html string
    
    turnsEl.appendChild(turnsContent);

    displayContainer.append(timerEl, turnsEl)
    return displayContainer
};
//* ^all it does is create DOM elements

function renderMain() {
    const mainPage = document.createElement('div')
    mainPage.id = 'main-page'
    
    const display = createDisplay()
    mainPage.append(display)
    
    boardEl.innerHTML = ''//* before rendering the board, you ensure that any existing content inside boardEl is removed before appending the new board. This should prevent the duplication of the board-container element.
    renderBoard()
    mainPage.append(boardEl)
    
    bodyEl.innerHTML = '' //* clears the splash page
    bodyEl.append(mainPage)
};
