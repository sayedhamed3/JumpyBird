console.log("Test")

const playBtnEl = document.querySelector("#play-button")
const settingsBtnEl = document.querySelector("#settings-button")
const helpBtnEl = document.querySelector("#help-button")
const mainMenuBtnEl = document.querySelector("#main-menu-button")
const playAgainBtnEl = document.querySelector("#play-again-button")
const soundEl = document.querySelector("#sound")
const musicEl = document.querySelector("#music")
const themesEl = document.querySelectorAll(".theme")

const settingsMenuEl = document.querySelector("#settings-menu")

const mainWindowEl = document.getElementById("main")
const gameWindowEl = document.getElementById("game")
const gameOverOverlayEl = document.getElementById("game-over")

settingsMenuEl.style.display = "none"
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
        soundEl.src = "./assets/images/sound-off.png"
        soundEnabled = false;
    }
    else {
        soundEl.src = "./assets/images/sound-on.png"
        soundEnabled = true;
    }

}

let musicEnabled = true
const toggleMusic = () => {
    if(musicEnabled) {
        musicEl.src = "./assets/images/music-off.png"
        musicEnabled = false;
    }
    else {
        musicEl.src = "./assets/images/music-on.png"
        musicEnabled = true;
    }

}

const normalTheme = document.querySelector(".normal")
const purpleTheme = document.querySelector(".purple")
const darkTheme = document.querySelector(".dark")

const changeTheme = (event) => {
    if(event.target.classList.contains("normal")){
        normalTheme.classList.add("selected")
        purpleTheme.classList.remove("selected")
        darkTheme.classList.remove("selected")
    } else if(event.target.classList.contains("purple")){
        normalTheme.classList.remove("selected")
        purpleTheme.classList.add("selected")
        darkTheme.classList.remove("selected")
    } else {
        normalTheme.classList.remove("selected")
        purpleTheme.classList.remove("selected")
        darkTheme.classList.add("selected")
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