

export function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let names = document.querySelectorAll('.perfil-nome') || false
  
    if(names){
        names.forEach(name => {
            name.innerText= userOn.name;
        });
        
    } 
    console.log(name);
    

}
showName()

