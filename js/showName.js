

function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let nome = document.querySelector('#perfil-nome') || false
  
    
    if(nome){
        nome.innerText= usersadm[userOn.index].name;
    } 

}

showName()

