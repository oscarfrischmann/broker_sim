const withdrawalBtn = document.getElementById("withdrawalBtn");
const withdrawal = document.getElementById("userCashInput");
const hideCard = document.getElementById("hideCard");

withdrawalBtn.addEventListener('click', ()=>{
    if(!withdrawal.value || isNaN(withdrawal.value)){
        withdrawalBtn.style.backgroundColor = "red";
		setTimeout(() => {
			withdrawalBtn.style.backgroundColor = "#518AD5";
		}, 1000);
    }else {
        let userCash = Number(localStorage.getItem('cash'));
        userCash -= withdrawal.value;
        localStorage.setItem('cash', userCash);
        const withdrawalOk = document.createElement('p');
        withdrawalOk.textContent = 'SUCCESSFUL WITHDRAWAL';
        hideCard.appendChild(withdrawalOk);
        setTimeout(()=>{
            window.location="./trading.html"
        }, 2000);
    }
})