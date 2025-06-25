

export function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let names = document.querySelectorAll('.perfil-nome') || false
  
    if(names){
        names.forEach(name => {
            name.innerText= usersadm[userOn.index].name;
            
        });
    } 
    

}

showName()

