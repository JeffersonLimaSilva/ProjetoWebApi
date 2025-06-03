

let v2= 10000
let v3= 10000



function styleValue(x, colorC){
    var valueCad = document.createElement('span')
    valueCad.textContent = x;
    valueCad.style.color = colorC;
    valueCad.style.fontSize= '65px' 
    valueCad.style.marginTop= '30px'

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
    c.appendChild(styleValue(v3, 'red'))
}
function contaCad(){
    let users = JSON.parse(localStorage.getItem('users'))
    let numcad = 0
    users.forEach(function(user, index){
        if(index > numcad){
            numcad = index 
        }
    })

    return numcad + 1
}

showCad()
showCadMes()
showCadPend()



