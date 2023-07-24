const menu = document.querySelector('#menu')
const buttonMenu = document.querySelector('.menuImg')


function exibirMenu() {
    if (menu.classList.value == "menu") {
        menu.classList.replace('menu', 'hidden')
        buttonMenu.src = "src/midias/icons8-hamburger-menu.svg"
    } else {
        menu.classList.replace('hidden', 'menu')
        buttonMenu.src = "src/midias/icons8-close.svg"
    }
}
