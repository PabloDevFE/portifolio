let header = document.querySelector("#header");
let navigation = document.querySelector("#navigation");
let main = document.querySelector("#main");
let btnOpen = document.querySelector("#btnHeaderHamburguer");
let btnClose = document.querySelector("#btnHeaderClose");
let showSidebar = false;

function toggleSidebar() {
  showSidebar = !showSidebar;
  if (showSidebar) {
    navigation.style.marginLeft = "0vw";
    navigation.style.animationName = "showMenu";
    main.style.filter = "blur(10px)";
  } else {
    navigation.style.marginLeft = "-100vw";
    navigation.style.animationName = "";
    main.style.filter = "";
  }
}

function closeSidebar() {
  if (showSidebar) {
    showSidebar = true;
    toggleSidebar();
  }
}

window.addEventListener("resize", function (event) {
  if (window.innerWidth > 768 && showSidebar) {
    showSidebar = true;
    btnOpen.style.visibility = "";
    toggleSidebar();
  }
});

btnOpen.addEventListener("click", () => {
  toggleSidebar();
  btnOpen.style.visibility = "hidden";
});

btnClose.addEventListener("click", () => {
  toggleSidebar();
  btnOpen.style.visibility = "";
});
