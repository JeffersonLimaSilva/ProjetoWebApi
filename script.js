
let v1= 0
let v2= 0
let v3= 0



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
    let divlist=document.getElementById('list-div')
    let spanNome= document.createElement('span')
    spanNome.textContent="Jefferson"
    let spanEmail = document.createElement('span')
    spanEmail.textContent= "jefferson@gamil.com"
    spanEmail.style.marginLeft='25px'
    let spanStatus = document.createElement('span')
    spanStatus.textContent ="Ativo"
    spanStatus.style.textAlign= 'end'
    spanStatus.style.marginRight='40px'
    let hrlist = document.createElement('hr')
    hrlist.classList.add('list-line')
    hrlist.style.width='980px'
    hrlist.style.height='0.1px'
    hrlist.style.marginLeft='10px'

    list.appendChild(spanNome)
    list.appendChild(spanEmail)
    list.appendChild(spanStatus)
    divlist.appendChild(hrlist)
}


showCad()
showCadMes()
showCadPend()
criaLista()