function checkTeste(){
    let theme = JSON.parse(localStorage.getItem('theme')) || false;
    if (theme) {
        document.body.classList.add('theme-black');
    }
}
checkTeste()


