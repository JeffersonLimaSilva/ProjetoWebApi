
let v1=0
let v2= 0
let v3= 10



function styleValue(x, colorC){
    var valueCad = document.createElement('span')
    valueCad.textContent = x;
    valueCad.style.color = colorC;
    valueCad.style.fontSize= '65px' 
    valueCad.style.marginTop= '30px'

    return valueCad
}

function showCad(){
    v1=contaCad()
    let c = document.getElementById('cad')
    c.appendChild(styleValue(v1, 'blue'))
    
}
function showCadMes(){
    v2 =contaCad()
    let c = document.getElementById('cad-mes')
    c.appendChild(styleValue(v2, 'green'))
}
function showCadPend(){
    let c = document.getElementById('cad-pend')
    c.appendChild(styleValue(contaInativo(), 'red'))
}
function contaCad(){
    let users = JSON.parse(localStorage.getItem('users')) || []
    let numcad = 0
    users.forEach(function(user, index){
        if(users == []){
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
    let users = JSON.parse(localStorage.getItem('users')) || []
    let numcad = 0

    users.forEach(function(user){
        if(user.ativo == 'Inativo'){
            numcad ++
        }
    })
    return numcad
}

showCad()
showCadMes()
showCadPend()



