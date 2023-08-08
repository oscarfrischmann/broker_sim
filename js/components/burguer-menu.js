const menuIcon = document.getElementById("burguerIcon");
const navMenu = document.getElementById("navMenu");
const main = document.getElementById('main');

menuIcon.addEventListener("click", () => {
  
	navMenu.classList.toggle("display-none");
});

// main.addEventListener('click', () => {
//     navMenu.classList.add("display-none")
// });

window.addEventListener('click', (e)=>{
    if (!navMenu.contains(e.target) && (!menuIcon.contains(e.target))){
        navMenu.classList.add("display-none")
    } 
})
