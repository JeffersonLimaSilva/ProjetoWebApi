

export function criaLista(search = ''){

    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    
    let tbody = document.getElementById('tbody-users')
    tbody.innerHTML=''

    let perPage= 6

    const state={
        page: 1,
        perPage,
        totalPages: Math.ceil(usersadm[userOn.index].users.length / perPage)
    }

    
    
    const html ={
        get(element){
            return document.querySelector(element)
        }
    }

    const controsls={
        next(){
            state.page++

            const lastPage = state.page > state.totalPages
            if(lastPage){
                state.page --
            }
        },
        prev(){
            state.page --
            if (state.page < 1){
                state.page ++
            }   
        },
        goTo(page){
            if(page < 1){
                page = 1
            }
            state.page = page

            if(page > state.totalPages){
                state.page = state.totalPages
            }
        }, 
        creatListeners(){
            html.get('.fist').addEventListener('click', ()=>{
                controsls.goTo(1)
                update()
            })
            html.get('.last').addEventListener('click', ()=>{
                controsls.goTo(state.totalPages)
                update()
            })
            html.get('.prev').addEventListener('click', ()=>{
                controsls.prev()
                update()
            })
            html.get('.next').addEventListener('click', ()=>{
                controsls.next()
                update()
            })
        }
    }

    const list = {
        create(lista){
            listaItems(lista, tbody, search)
        },
        update(){
            html.get('#tbody-users').innerHTML = ""

            let page = state.page - 1
            let start = page * state.perPage
            let end = start + state.perPage

            console.log(usersadm[userOn.index].users);
            

            const paginatedItems = usersadm[userOn.index].users.slice(start, end)
            
            paginatedItems.forEach(function(lista){
                list.create(lista)
            });
        }

    }

    function init(){
        list.update()
        controsls.creatListeners()
        number()
    }

    function update(){
        list.update()
        number()
    }

    function number(){
        html.get('.number div').textContent = state.page
    }
    init()
   
}

function listaItems(user, tbody, search){

    let minName = user.name.toLowerCase()
    let minEmail = user.email.toLowerCase()
    let minAtivo = user.ativo.toLowerCase()

    if(minName.includes(search) || minEmail.includes(search) || minAtivo.includes(search)){
        let trbody = document.createElement('tr')
        let tdname = document.createElement('td')
        let tdemail = document.createElement('td')
        let tdativo = document.createElement('td')
        let tdmenu = document.createElement('td')
        
        tdname.textContent =   user.name
        tdemail.textContent =  user.email
        tdativo.textContent = user.ativo
        
        

        let spanEditar =document.createElement('span')
        spanEditar.style.border='solid 0.1px rgb(68, 68, 68)'
        spanEditar.style.height='23px'
        spanEditar.style.width='23px'
        spanEditar.style.borderRadius='3px'
        spanEditar.style.padding='2px 2px 0 2px'
        
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
        spanRemover.style.height='23px'
        spanRemover.style.width='23px'
        spanRemover.style.borderRadius='3px'
        spanRemover.style.padding='2px 2px 0 2px'
        
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
        
        spanEditar.appendChild(imgEditar)
        spanRemover.appendChild(imgRemover)

        tdmenu.appendChild(spanEditar)
        tdmenu.appendChild(spanRemover)

        trbody.appendChild(tdname)
        trbody.appendChild(tdemail)
        trbody.appendChild(tdativo)
        
        trbody.appendChild(tdmenu)
        tbody.appendChild(trbody)

    }

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
    let minSearch = this.value.toLowerCase()
    criaLista(minSearch)
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