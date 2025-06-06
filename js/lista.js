

export function criaLista(search = ''){

    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let divlist=document.querySelector('.div-box-list')

    divlist.innerHTML=''
    console.log(userOn.index);
    
    usersadm[userOn.index].users.forEach(function(user, index){

        let divDivList = document.createElement('div')
        divDivList.classList.add('list-div')


        if(user.name.includes(search) || user.email.includes(search) || user.ativo.includes(search)){

            
            let list = document.createElement('div')
            list.classList.add('box-list')
            list.style.height='25px'
            list.style.alignItems='center'
            list.style.padding='0px 5px'

            let spanNome= document.createElement('span')
            spanNome.textContent= user.name
            spanNome.style.width='320px'

            let spanEmail = document.createElement('span')
            spanEmail.textContent= user.email
            spanEmail.style.width='320px'

            let spanStatus = document.createElement('span')
            spanStatus.textContent = user.ativo
            spanStatus.style.textAlign= 'end'
            spanStatus.style.paddingRight= '20px'
            spanStatus.style.width='240px'

            let spanEditar =document.createElement('span')
            spanEditar.style.border='solid 0.1px rgb(68, 68, 68)'
            spanEditar.style.height='17px'
            spanEditar.style.width='17px'
            spanEditar.style.borderRadius='3px'
            spanEditar.style.paddingLeft='2px'
            spanEditar.style.paddingTop='2px'
            spanEditar.addEventListener('click', ()=>{
                criaEditar(divDivList, index, userOn.index)
            })

            let imgEditar = document.createElement('img')
            imgEditar.src='/img/svgEditar.svg'
            imgEditar.alt='Editar'
            imgEditar.style.width='15px'

            let spanRemover = document.createElement('span')
            spanRemover.className='spanRemover'
            spanRemover.style.border='solid 0.1px rgb(68, 68, 68)'
            spanRemover.style.height='17px'
            spanRemover.style.width='17px'
            spanRemover.style.borderRadius='3px'
            spanRemover.style.paddingLeft='2px'
            spanRemover.style.paddingTop='2px'
            spanRemover.style.marginLeft='5px'
            spanRemover.addEventListener('click', ()=>{
                removeUser(index)
                showCad()
                showCadMes()
                showCadPend()
            })
            
            let imgRemover = document.createElement('img')
            imgRemover.src= '/img/svgRemover.svg'
            imgRemover.alt='Remover'
            imgRemover.style.width='15px'

            let hrlist = document.createElement('hr')
            hrlist.classList.add('list-line')
            hrlist.style.width='965px'
            hrlist.style.height='0.1px'

                
            spanEditar.appendChild(imgEditar)
            spanRemover.appendChild(imgRemover)
            list.appendChild(spanNome)
            list.appendChild(spanEmail)
            list.appendChild(spanStatus)
            list.appendChild(spanEditar)
            list.appendChild(spanRemover)
            divDivList.appendChild(list)
            divDivList.appendChild(hrlist)
            divlist.appendChild(divDivList)

        }
        

    });
   
}

document.addEventListener('DOMContentLoaded', function(e){

    let listDiv =document.querySelectorAll('.list-div')

    listDiv.forEach(function(campoList){
        
        campoList.addEventListener('mouseover', function(e){
            let boxList=this.querySelector('.box-list')
            boxList.style.backgroundColor='rgb(207, 207, 243)'
            boxList.style.borderRadius='3px'
        })
        campoList.addEventListener('mouseout', function(e){
            let boxList=this.querySelector('.box-list')
            boxList.style.backgroundColor=''
        })

    })

    
})

document.getElementById('search').addEventListener('input', function(e){
    criaLista(this.value)
})

function removeUser(index){
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []
    usersadm[userOn.index].users.splice(index, 1)
    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    
    criaLista();
}

function showCad(){
    let c = document.getElementById('cad') || false
    
    
    if (c) {
        c.innerHTML=''
        c.appendChild(styleValue(contaCad(), 'blue'))
    }
}
function showCadMes(){
    let c = document.getElementById('cad-mes') || false
    if (c) {
        c.innerHTML=''
        c.appendChild(styleValue(contaCad(), 'green'))
    }
}
function showCadPend(){
    let c = document.getElementById('cad-pend') || false
    if (c) {
        c.innerHTML=''
        c.appendChild(styleValue(contaInativo(), 'red'))
    }
    
}

function styleValue(x, colorC){
    var valueCad = document.createElement('span')
    valueCad.textContent = x;
    valueCad.style.color = colorC;
    valueCad.style.fontSize= '55px' 
    valueCad.style.marginTop= '10px'

    return valueCad
}

function contaCad(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
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
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let numcad = 0

    usersadm[userOn.index].users.forEach(function(user){
        if(user.ativo == 'Inativo'){
            numcad ++
        }
        
    })
    return numcad
}

function criaEditar(divDivList, index, indexOn){
    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []

    let spanBoxEditar = document.createElement('div')
    spanBoxEditar.style.height='30px'
    spanBoxEditar.style.backgroundColor='rgb(214, 214, 252)'
    spanBoxEditar.style.borderRadius='3px'
    spanBoxEditar.style.display='flex'
    spanBoxEditar.style.alignItems='center'
    spanBoxEditar.style.paddingLeft='5px'
    let inputNome= document.createElement('input')
    inputNome.style.width='250px'
    inputNome.style.backgroundColor='white'
    inputNome.style.marginRight='65px'
    inputNome.style.border='solid 0.1px rgb(68, 68, 68)'
    inputNome.style.borderRadius='3px'
    let inputEmail= document.createElement('input')
    inputEmail.style.width='250px'
    inputEmail.style.backgroundColor='white'
    inputEmail.style.marginRight='255px'
    inputEmail.style.border='solid 0.1px rgb(68, 68, 68)'
    inputEmail.style.borderRadius='3px'
    let inputAtivo= document.createElement('input')
    inputAtivo.style.width='50px'
    inputAtivo.style.backgroundColor='white'
    inputAtivo.style.marginRight='12px'
    inputAtivo.style.border='solid 0.1px rgb(68, 68, 68)'
    inputAtivo.style.borderRadius='3px'
    let imgConfirma=document.createElement('img')
    imgConfirma.src= '/img/svgCheck.svg'
    imgConfirma.alt='Confirmar'
    imgConfirma.style.width='15px'

    let spanConfirma = document.createElement('span')
    spanConfirma.style.border='solid 0.1px rgb(68, 68, 68)'
    spanConfirma.style.height='17px'
    spanConfirma.style.width='17px'
    spanConfirma.style.borderRadius='3px'
    spanConfirma.style.paddingLeft='2px'
    spanConfirma.style.paddingTop='2px'
    spanConfirma.style.marginRight='4px'
    spanConfirma.addEventListener('click', ()=>{


        if(inputNome.value != ''){
            
            if(!validaNome(inputNome.value)){
                alert("Nome Invalido")
                return false
            }
            editarUser(index, 'name', inputNome.value)
            alert("Nome atualizado")
        }
        if(inputEmail.value != ''){

            if(!validaEmail(inputEmail.value)){
                alert("Email Invalido")
                return false
            }
            if(verificaIgual(usersadm[indexOn], inputEmail.value)){
                alert("Email ja cadastrado")
                return false
            }
        
            
            editarUser(index, 'email', inputEmail.value)
            alert("Email atualizado")
        }
        if(inputAtivo.value != ''){
            editarUser(index, 'ativo', inputAtivo.value)
            alert("Atividade atualizada")

            showCadPend()
        }



    })

    let imgFechar=document.createElement('img')
    imgFechar.src= '/img/svgRemover.svg'
    imgFechar.alt='Fechar'
    imgFechar.style.width='15px'

    let spanFechar = document.createElement('span')
    spanFechar.style.border='solid 0.1px rgb(68, 68, 68)'
    spanFechar.style.height='17px'
    spanFechar.style.width='17px'
    spanFechar.style.borderRadius='3px'
    spanFechar.style.paddingLeft='2px'
    spanFechar.style.paddingTop='2px'
    spanFechar.addEventListener('click', ()=>{
        divDivList.removeChild(spanBoxEditar)
    })

    spanConfirma.appendChild(imgConfirma)
    spanFechar.appendChild(imgFechar)
    spanBoxEditar.appendChild(inputNome)
    spanBoxEditar.appendChild(inputEmail)
    spanBoxEditar.appendChild(inputAtivo)
    spanBoxEditar.appendChild(spanConfirma)
    spanBoxEditar.appendChild(spanFechar)
    divDivList.appendChild(spanBoxEditar)
}

function editarUser(index, campo, conteudo){
    
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    usersadm[userOn.index].users[index][campo] = conteudo
    localStorage.setItem('usersadm', JSON.stringify(usersadm))

    criaLista()
    
}

function validaNome(nome){
    let rnome = /^[A-Z][a-z]+[\s][A-Z][a-z]+$/
    return rnome.test(nome)
}

function validaEmail(email){

    let remail = /^[^\s]+@[^\s]+\.[^\s]+$/
    return remail.test(email)
}

function verificaIgual(usersadm, email){
    return usersadm.users.some(function(user){
        return user.email === email  
    })
}

criaLista() 
showCad()
showCadMes()
showCadPend()