

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





document.addEventListener("DOMContentLoaded", () => {
    loadThemePreference();
});