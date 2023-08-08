const menuIcon = document.getElementById("burguerIcon");
const navMenu = document.getElementById("navMenu");
const body = document.getElementById('main');

menuIcon.addEventListener("click", () => {
  
	navMenu.classList.toggle("display-none");
});

body.addEventListener('click', () => {
    navMenu.classList.add("display-none")
});

