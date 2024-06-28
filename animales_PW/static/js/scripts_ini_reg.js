
/* inicio sesion */
const btnSingIn = document.getElementById('btn-sing-in');
const btnSingUP = document.getElementById('btn-sing-up');
const contSingIn = document.getElementById('welcome-sing-in');
const contSingUp = document.getElementById('welcome-sing-up');
const container1 = document.querySelector("#container-ini-reg");
contSingIn.style.display = 'block';
contSingUp.style.display = 'none';

btnSingIn.addEventListener('click', () => {
    container1.classList.toggle('toggle');
    contSingIn.style.display = 'none';
    contSingUp.style.display = 'block';
}
);
btnSingUP.addEventListener('click', () => {
    container1.classList.toggle('toggle');
    contSingIn.style.display = 'block';
    contSingUp.style.display = 'none';
}
);