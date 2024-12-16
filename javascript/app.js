// Menu Logic / Functionality



// Menu / Themes elements
const playBtnEl = document.querySelector("#play-button")
const settingsBtnEl = document.querySelector("#settings-button")
const helpBtnEl = document.querySelector("#help-button")
const mainMenuBtnEl = document.querySelector("#main-menu-button")
const playAgainBtnEl = document.querySelector("#play-again-button")
const soundEl = document.querySelector("#sound")
const musicEl = document.querySelector("#music")
const themesEl = document.querySelectorAll(".theme")
const settingsMenuEl = document.querySelector("#settings-menu")
const mainHighScore = document.getElementById("main-high-score")

// Windows elements
const mainWindowEl = document.getElementById("main")
const gameWindowEl = document.getElementById("game")
const gameOverOverlayEl = document.getElementById("game-over")


const goToGame = () => {
    gameOverOverlayEl.style.display = "none"
    mainWindowEl.style.display = "none"
    gameWindowEl.style.display = "flex"
}

const goToMenu = () => {
    gameOverOverlayEl.style.display = "none"
    mainWindowEl.style.display = "flex"
    gameWindowEl.style.display = "none"
    settingsMenuEl.style.display = "none"
    mainHighScore.textContent = sessionStorage.getItem("highScore")
}

const toggleSettingsMenu = () => {
    if (settingsMenuEl.style.display == "none") {
        settingsMenuEl.style.display = "flex"
    } else {
        settingsMenuEl.style.display = "none"
    }
}

let soundEnabled = true
const toggleSound = () => {
    if (soundEnabled) {
        soundEl.classList.replace("sound-on", "sound-off")
        soundEnabled = false
    }
    else {
        soundEl.classList.replace("sound-off", "sound-on")
        soundEnabled = true
    }
}

let musicEnabled = true
const toggleMusic = () => {
    if (musicEnabled) {
        musicEl.classList.replace("music-on", "music-off")
        musicEnabled = false;
    }
    else {
        musicEl.classList.replace("music-off", "music-on")
        musicEnabled = true;
    }

}

const bodyEl = document.querySelector("body")
const normalTheme = document.querySelector(".normal")
const purpleTheme = document.querySelector(".purple")
const darkTheme = document.querySelector(".dark")

const changeTheme = (event) => {
    let selectedTheme;
    if (event.target.classList.contains("normal")) {
        selectedTheme = "normal-theme";
    } else if (event.target.classList.contains("purple")) {
        selectedTheme = "purple-theme";
    } else {
        selectedTheme = "dark-theme";
    }
    bodyEl.classList.remove("normal-theme", "purple-theme", "dark-theme");
    bodyEl.classList.add(selectedTheme);

    localStorage.setItem("selectedTheme", selectedTheme)

    themesEl.forEach(theme => {
        theme.classList.toggle("selected", theme.classList.contains(selectedTheme.split("-")[0]));
    });
}

const loadThemePreference = () => {
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme) {
        document.body.classList.add(savedTheme)

        const themesEl = document.querySelectorAll(".theme")
        themesEl.forEach(theme => {
            theme.classList.toggle("selected", theme.classList.contains(savedTheme.split("-")[0]));
        });
    } else {
        document.body.classList.add(normalTheme)
        const normalTheme = document.querySelector(".normal")
        normalTheme.classList.add("selected")
    }
}

const playAgain = () => {
    goToGame()
    restartGame()
    takeKeyInput = true
    scoreEL.style.display = "flex"
}

playBtnEl.addEventListener("click", playAgain)
playAgainBtnEl.addEventListener("click", playAgain)
mainMenuBtnEl.addEventListener("click", goToMenu)
settingsBtnEl.addEventListener("click", toggleSettingsMenu)
helpBtnEl.addEventListener("click", () => {
    window.location.href = 'how-to-play.html'
})
soundEl.addEventListener("click", toggleSound)
musicEl.addEventListener("click", toggleMusic)
themesEl.forEach(theme => {
    theme.addEventListener("click", (event) => changeTheme(event))
});




document.addEventListener("DOMContentLoaded", () => {
    loadThemePreference();
    mainHighScore.textContent = sessionStorage.getItem("highScore")
    init();
});



// Game Logic / Functionality

const board = document.querySelector(".board")
const scoreEL = document.querySelector("#score")
const finalScoreEl = document.getElementById("finalScore")
const highScoreEl = document.getElementById("highScore")
const newHighScoreIndicatorEl = document.getElementById("newHighScoreIndicator")
// set board width and height
const boardWidth = 22
const boardHeight = 30


for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
        const cell = document.createElement('div')
        cell.classList.add("cell")
        // cell id only to know
        cell.id = (i * boardHeight) + j
        board.appendChild(cell)
    }
}

// make variables
let highScore
let gameInterval
let playerInterval
let renderInterval
let bird
let birdGravity
let pipeList = []
let gameActive
let isHit
let score
let gameSpeed
let takeKeyInput = true




// Get highscore from session storage if available
const getHighScore = () => sessionStorage.getItem("highScore")

// find cells in board
const cellsEl = document.querySelectorAll(".cell")

// initialization of game
const init = () => {
    highScore = getHighScore()
    generatePipe()
    score = 0
    birdGravity = 1
    gameActive = false
    isHit = false
    gameSpeed = 1
    bird = { x: Math.floor(boardWidth / 2) - 3, y: Math.floor(boardHeight / 2 - 3) }
    drawBoard()
}


// Pipe Logic

// each pipe is an object with 3 values 
// (x: horizontal position)
// (y: top pipe length)
// (h: gap between pipes length)

// makes a random pipe object and pushes it to pipeList
const generatePipe = () => {
    const minY = 4  // minimum Pipe y lvl
    const maxY = 17 // maximum pipe y lvl
    const newPipe = {}
    newPipe.x = boardWidth - 2
    newPipe.y = minY + Math.floor(Math.random() * maxY)
    newPipe.h = 6 + Math.floor(Math.random() * 2)
    pipeList.push(newPipe)
}

// makes an array of cell indexes which the pipe would occupy on the board
const getPipeArray = (pipe) => {
    const pipeArray = []
    for (let i = pipe.x; i < pipe.y * boardWidth; i += boardWidth) {
        pipeArray.push(i)
    }
    let lastIndex = pipeArray.length - 1
    pipeArray.splice(lastIndex, 0, pipeArray[lastIndex] - 1, pipeArray[lastIndex] + 1)
    for (let i = pipe.x + boardWidth * boardHeight; i > (pipe.y + pipe.h) * boardWidth; i -= boardWidth) {
        pipeArray.push(i)
    }
    lastIndex = pipeArray.length - 1
    pipeArray.splice(lastIndex, 0, pipeArray[lastIndex] - 1, pipeArray[lastIndex] + 1)
    return pipeArray
}

// draw board function
const drawBoard = () => {
    resetBoard()
    drawPipes()
    drawBird()
}

// reset board function
const resetBoard = () => {

    // remove all extra classes from cells
    cellsEl.forEach(cell => {
        cell.classList = "cell"
    });

}

// draws pipes on board
const drawPipes = () => {
    // goes through each cell 
    cellsEl.forEach((cell, index) => {
        // goes through each pipe in pipeList
        pipeList.forEach((pipe) => {
            // retrieves array of indexes for each pipe and goes through each index in array
            getPipeArray(pipe).forEach(list => {
                if (index == list) {
                    // if index inside array (list) matches index in cells (index) then adds pipe class
                    cell.classList.add("pipe")
                }
            })
        })
    })
}

// draws bird on board
const drawBird = () => {
    // goes through each cell 
    cellsEl.forEach((cell, index) => {
        // checks if index matches with bird coordinates and adds "bird" class to cell
        if (index == boardWidth * bird.y + bird.x) {
            cell.classList.add("bird")
        }
    })
}


// moves pipes in pipeList
const shiftPipes = () => {
    // goes through each pipe and moves x value to the left (-1)
    pipeList = pipeList.map((pipe) => {
        let newPipe = {
            x: pipe.x - 1,
            y: pipe.y,
            h: pipe.h,
        }
        return newPipe
    })
}

// updates pipe list based on position
const updatePipe = () => {

    // if first pupe is on left most side, remove from pipeList
    if (pipeList[0].x == 1) {
        pipeList.shift()
    }
    // if first pipe is on left of bird, genereate new pipe
    if (pipeList[0].x == bird.x - (1 + Math.floor(score / 10))) {
        generatePipe()
    }

}



const checkCollision = () => {
    // get bird index
    let bird_cell_ind = bird.x + bird.y * boardWidth

    // check if bird hits pipe
    getPipeArray(pipeList[0]).forEach((pipe_idx) => {
        // if pipe index == bird index, isHit = true
        if (pipe_idx == bird_cell_ind) {
            isHit = true
        }

    })

    // checks if bird hits top/bottom of board
    if (bird.y < 1 || bird.y > boardHeight - 1) {
        isHit = true
    }
}

const gameOver = async () => {
    gameActive = false
    if (score > highScore) {
        newHighScoreIndicatorEl.style.display = "flex"
        highScore = score
        sessionStorage.setItem("highScore", highScore)
    }
    finalScoreEl.textContent = score
    highScoreEl.textContent = sessionStorage.getItem("highScore")
    console.log("Game Over")
    console.log(`highscore: ${highScore}`)
    clearInterval(gameInterval)
    clearInterval(playerInterval)
    clearInterval(renderInterval)
    await birdFall();
    scoreEL.style.display = "none"
    gameOverOverlayEl.style.display = "flex"
}

const birdFall = () => {
    console.log("bird fall")
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            console.log("moving")
            moveBird();
            drawBoard();
    
    
            if (bird.y >= boardHeight - 1) {
                bird.y = boardHeight - 1
                clearInterval(interval)
                console.log("bird has fallen")
    
                resolve();
            }
        }, 40)
    })
}

// move Bird based on gravity
const moveBird = () => {
    bird.y += birdGravity
    // if gravity is negative (bird going up) then slowly get gravity back to positive (bird going down)
    if (birdGravity < 1) {
        birdGravity += 1
    }
}

const birdJump = () => {
    if (gameActive) {
        birdGravity = -2
    }

}


const updateGameSpeed = () => {
    gameSpeed = 1 + Math.floor(score / 3) / 5
    clearInterval(gameInterval)
    gameInterval = setInterval(gameTick, 200 / gameSpeed)
}
// -------------------------- GAME TICKS -----------------------------------

const birdTick = () => {
    moveBird()
}

const gameTick = () => {
    updateGameSpeed()
    // if bird is same index as pipe,
    if (bird.x == pipeList[0].x) {
        score = score + 1
    }
    shiftPipes()
    if (!isHit) {
        updatePipe()
    }
}

const renderTick = () => {
    checkCollision()
    if (isHit) {
        takeKeyInput = false;
        gameOver()

    }
    drawBoard()
    scoreEL.textContent = score
}

const startGame = () => {
    gameActive = true;

    clearInterval(gameInterval)
    gameInterval = setInterval(gameTick, 200)
    clearInterval(playerInterval)
    playerInterval = setInterval(birdTick, 100)
    clearInterval(renderInterval)
    renderInterval = setInterval(renderTick, 10)
}

const restartGame = () => {
    gameActive = false;
    pipeList = []
    init()
    isHit = false;
    newHighScoreIndicatorEl.style.display = "none";
    clearInterval(gameInterval)
    clearInterval(playerInterval)
    clearInterval(renderInterval)
}

document.addEventListener('keypress', (event) => {

    if(!takeKeyInput) return

    if (event.key == " ") {
        event.preventDefault()
        if (!gameActive && gameOverOverlayEl.style.display == "none") {
            console.log("ActivateGame")
            startGame()
        }
        birdJump()
    }
})

