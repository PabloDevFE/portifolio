const menu = document.querySelector('#menu')


function exibirMenu() {
    if (menu.classList.value == "menu") {
        menu.classList.replace('menu', 'hidden')
    } else {
        menu.classList.replace('hidden', 'menu')
    }
}
