
let v1= 100
let v2= 10
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
    let c = document.getElementById('cad')
    c.appendChild(styleValue(v1, 'blue'))
}
function showCadMes(){
    let c = document.getElementById('cad-mes')
    c.appendChild(styleValue(v2, 'green'))
}
function showCadPend(){
    let c = document.getElementById('cad-pend')
    c.appendChild(styleValue(v3, 'red'))
}

function criaLista(){
    let list= document.getElementById('box-list')
    let spanNome= document.createElement('span')
    spanNome.textContent="Jefferson"
    let spanEmail = document.createElement('span')
    spanEmail.textContent= "jefferson@gamil.com"
    let spanStatus = document.createElement('span')
    spanStatus.textContent ="Ativo"

    list.appendChild(spanNome)
    list.appendChild(spanEmail)
    list.appendChild(spanStatus)
}


showCad()
showCadMes()
showCadPend()
criaLista()