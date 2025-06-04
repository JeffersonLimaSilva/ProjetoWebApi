let userOn = JSON.parse(localStorage.getItem('userOn')) || []
let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

function showName(){

    let nome = document.getElementById('perfil-nome')
    nome.innerText= usersadm[userOn.index].name;
}


function styleValue(x, colorC){
    var valueCad = document.createElement('span')
    valueCad.textContent = x;
    valueCad.style.color = colorC;
    valueCad.style.fontSize= '55px' 
    valueCad.style.marginTop= '10px'

    return valueCad
}

function showCad(){
    let c = document.getElementById('cad')
    c.appendChild(styleValue(contaCad(), 'blue'))
}
function showCadMes(){
    let c = document.getElementById('cad-mes')
    c.appendChild(styleValue(contaCad(), 'green'))
}
function showCadPend(){
    let c = document.getElementById('cad-pend')
    c.appendChild(styleValue(contaInativo(), 'red'))
}
function contaCad(){
    let numcad = 0
    usersadm[userOn.index].users.forEach(function(user, index){
        if(usersadm[userOn.index].users == []){
            return 0
        }
        if(index >= numcad){
            numcad = index 
            numcad ++
        }
        
    })

    return numcad
}
function contaInativo(){
    let numcad = 0

    usersadm[userOn.index].users.forEach(function(user){
        if(user.ativo == 'Inativo'){
            numcad ++
        }
        
    })
    return numcad
}



showName()


showCad()
showCadMes()
showCadPend()



