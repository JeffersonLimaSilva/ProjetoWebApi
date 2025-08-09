

export function showName(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let names = document.querySelectorAll('.perfil-nome') || false
  
    if(names){
        names.forEach(name => {
            name.innerHTML= `<p>${userOn.name}</p>`;
        });
        
    } 
}
showName()

