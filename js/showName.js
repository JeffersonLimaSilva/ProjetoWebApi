
function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || []
    let nome = document.querySelector('#perfil-nome') || false
    // console.log(usersadm[userOn.index]);
    
    
    
    // console.log(username);
    // console.log(nome);
    
    if(nome){
        nome.innerText= usersadm[userOn.index].name;
        // console.log(usersadm[userOn.index].name);
        
    } 
    
    
    
}

showName()

