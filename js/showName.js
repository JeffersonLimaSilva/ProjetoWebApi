


function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let nome = document.getElementById('perfil-nome')
    nome.innerText= usersadm[userOn.index].name;
    
}
showName()