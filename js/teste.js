function criaLista(){
    let list= document.querySelector('.box-list')
    let divlist=document.querySelector('.list-div')
    let spanNome= document.createElement('span')
    spanNome.textContent="Jefferson"
    
    let spanEmail = document.createElement('span')
    spanEmail.textContent= "jefferson@gamil.com"
    
    let spanStatus = document.createElement('span')
    spanStatus.textContent ="Ativo"
    spanStatus.style.textAlign= 'end'
    spanStatus.style.paddingRight= '10px'
    let hrlist = document.createElement('hr')
    hrlist.classList.add('list-line')
    hrlist.style.width='980px'
    hrlist.style.height='0.1px'
    

    list.appendChild(spanNome)
    list.appendChild(spanEmail)
    list.appendChild(spanStatus)
    divlist.appendChild(hrlist)
}

criaLista()