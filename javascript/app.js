console.log("Test")

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

// Windows elements
const mainWindowEl = document.getElementById("main")
const gameWindowEl = document.getElementById("game")
const gameOverOverlayEl = document.getElementById("game-over")


const goToGame = () => {
    gameOverOverlayEl.style.display = "none"
    mainWindowEl.style.display = "none"
    gameWindowEl.style.display = "flex"
    setTimeout(()=>{
        gameOverOverlayEl.style.display = "flex"
    }, 2000)
}

const goToMenu = () => {
    gameOverOverlayEl.style.display = "none"
    mainWindowEl.style.display = "flex"
    gameWindowEl.style.display = "none"
}

const toggleSettingsMenu = () => {
    if(settingsMenuEl.style.display == "none"){
        settingsMenuEl.style.display = "flex"
    } else {
        settingsMenuEl.style.display = "none"
    }
}

let soundEnabled = true
const toggleSound = () => {
    if(soundEnabled) {
        soundEl.classList.replace("sound-on","sound-off")
        soundEnabled = false
    }
    else {
        soundEl.classList.replace("sound-off","sound-on")
        soundEnabled = true
    }
}

let musicEnabled = true
const toggleMusic = () => {
    if(musicEnabled) {
        musicEl.classList.replace("music-on","music-off")
        musicEnabled = false;
    }
    else {
        musicEl.classList.replace("music-off","music-on")
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


playBtnEl.addEventListener("click", goToGame)
playAgainBtnEl.addEventListener("click", goToGame)
mainMenuBtnEl.addEventListener("click", goToMenu)
settingsBtnEl.addEventListener("click",toggleSettingsMenu)
helpBtnEl.addEventListener("click",()=>{
    window.location.href = 'how-to-play.html'
})
soundEl.addEventListener("click",toggleSound)
musicEl.addEventListener("click",toggleMusic)
themesEl.forEach(theme => {
    theme.addEventListener("click",(event) => changeTheme(event))
});




document.addEventListener("DOMContentLoaded", () => {
    loadThemePreference();
});





const board = document.querySelector(".board")
const scoreEL = document.querySelector("#score")

const boardWidth = 22
const boardHeight = 30


// Make cell elements in board
for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
        const cell = document.createElement('div')
        cell.classList.add("cell")
        // cell id only to know
        cell.id = (i * boardHeight) + j
        board.appendChild(cell)
    }
}

// find cells in board
const cellsEl = document.querySelectorAll(".cell")


// draw board function
const drawBoard = () => {

    // reset board
    cellsEl.forEach(cell => {
        cell.classList = "cell"
    });
}