export function showCad(){
    
    let c = document.getElementById('cad')
    c.innerHTML=''
    c.appendChild(styleValue(contaCad(), 'blue'))
}
export function showCadMes(){
    let c = document.getElementById('cad-mes')
    c.innerHTML=''
    c.appendChild(styleValue(contaCad(), 'green'))
}
export function showCadPend(){
    let c = document.getElementById('cad-pend')
    c.innerHTML=''
    c.appendChild(styleValue(contaInativo(), 'red'))
}