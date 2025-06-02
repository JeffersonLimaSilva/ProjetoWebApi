
let v1= 10000000
let v2= 10000000
let v3= 10000000



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

showCad()
showCadMes()
showCadPend()



