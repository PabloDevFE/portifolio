let header = document.querySelector("#header");
let navigation = document.querySelector("#navigation");
let showSidebar = false;
function toggleSidebar()
{
    showSidebar = !showSidebar;
    if(showSidebar)
    {
        navigation.style.marginLeft = '-5vw';
        navigation.style.animationName = 'showMenu';
        content.style.filter = 'blur(2px)';
    }
    else
    {
        navigation.style.marginLeft = '-100vw';
        navigation.style.animationName = '';
        content.style.filter = '';
    }
}

function closeSidebar()
{
    if(showSidebar)
    {
        showSidebar = true;
        toggleSidebar();
    }
}

window.addEventListener('resize', function(event) {
    if(window.innerWidth > 768 && showSidebar) 
    {  
        showSidebar = true;
        toggleSidebar();
    }
});