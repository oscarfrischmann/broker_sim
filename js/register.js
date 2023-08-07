
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', registerUser);



function registerUser(e) {
    e.preventDefault();
    const userEmailInput = registerForm['userEmail'].value;
    const userNameInput = registerForm['userName'].value;
    const userPasswordInput = registerForm['userPassword'].value;
    const userCountryInput = registerForm['userCountry'].value;

    const user = {
        id: 1,
        email: userEmailInput,
        name: userNameInput,
        password: userPasswordInput,
        country: userCountryInput,
    }
    do {
        if (userNameInput && userPasswordInput) {
            const userJSON = JSON.stringify(user);
            const userNameJSON = JSON.stringify(user.name);
            localStorage.setItem('userName', userNameJSON)
            localStorage.setItem('user', userJSON);
            setTimeout(() => {
                showSuccessAlertAndRedirect();
            }, 1000);
        } else {
            const registerButton = document.getElementById('registerButton');
            registerButton.style.backgroundColor = 'red';
            setTimeout(() => {
                const registerButton = document.getElementById('registerButton');
                registerButton.style.backgroundColor = '#518AD5';
            }, 2000);
            break;
        }
    } while (!userNameInput && !userPasswordInput)

}

function showSuccessAlertAndRedirect() {
    const modal = document.createElement('div');
    const section = document.getElementById('sectionRegister');
    console.log(section);
    section.insertAdjacentElement('afterend', modal);
    modal.className = 'showRegister'
    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);
    modal.innerHTML = `<p class="flex" style="text-transform: capitalize">Welcome ${user.name.toUpperCase()}!</p>
                        <br>
                        <small>Your account has been created</small>`;

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 3000);
}

let showPasswordBtn = document.getElementById('showPassword');
showPasswordBtn.addEventListener('click', ()=>{
    console.log(showPasswordBtn.value);

    if(showPasswordBtn.value === 'on'){
        console.log('show password')
        let userPasswordInputType = document.getElementById('registerPassword');
        console.log(userPasswordInputType);
    
        userPasswordInputType.removeAttribute('type'); 
        userPasswordInputType.setAttribute('type', 'text'); 
    }
    
})









