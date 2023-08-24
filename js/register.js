const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", registerUser);

function registerUser(e) {
	e.preventDefault();
	const userEmailInput = registerForm["userEmail"].value;
	const userNameInput = registerForm["userName"].value;
	const userPasswordInput = registerForm["userPassword"].value;
	const userCountryInput = registerForm["userCountry"].value;
	const confirmPassword = registerForm["confirmPasswordName"].value;

	const user = {
		id: 1,
		email: userEmailInput,
		name: userNameInput,
		password: userPasswordInput,
		country: userCountryInput,
	};
	do {
		if (userNameInput && userPasswordInput && (userPasswordInput === confirmPassword)) {
			const userJSON = JSON.stringify(user);
			const userNameJSON = JSON.stringify(user.name);
			localStorage.setItem("userName", userNameJSON);
			localStorage.setItem("user", userJSON);
			const registerButton = document.getElementById('registerButton');
			registerButton.style.backgroundColor = "green";

			setTimeout(() => {
				showSuccessAlertAndRedirect();
			}, 1000);
		} else {
			const registerButton = document.getElementById("registerButton");
			registerButton.style.backgroundColor = "red";
			setTimeout(() => {
				const registerButton = document.getElementById("registerButton");
				registerButton.style.backgroundColor = "#518AD5";
			}, 2000);
			break;
		}
	} while (!userNameInput && !userPasswordInput);
}

function showSuccessAlertAndRedirect() {
	const modal = document.createElement("div");
	const section = document.getElementById("sectionRegister");
	console.log(section);
	section.insertAdjacentElement("afterend", modal);
	modal.className = "showRegister";
	const userJSON = localStorage.getItem("user");
	const user = JSON.parse(userJSON);
	modal.innerHTML = `<p class="flex" style="text-transform: capitalize">Welcome ${user.name.toUpperCase()}!</p>
                        <br>
                        <small>Your account has been created</small>`;

	setTimeout(() => {
		window.location.href = "../index.html";
	}, 3000);
}

let showPasswordBtn = document.getElementById("showPassword");
showPasswordBtn.addEventListener("click", () => {
	let userPasswordInputType = document.getElementById("registerPassword");
	if (showPasswordBtn.checked) {
		userPasswordInputType.setAttribute("type", "text");
	} else {
		userPasswordInputType.setAttribute("type", "password");
	}
});


let confirmPasswordBtn = document.getElementById("showConfirmPassword");
confirmPasswordBtn.addEventListener("click", () => {
	let confirmPasswordInputType = document.getElementById("confirmPassword");
	if (confirmPasswordBtn.checked) {
		confirmPasswordInputType.setAttribute("type", "text");
	} else {
		confirmPasswordInputType.setAttribute("type", "password");
	}
});