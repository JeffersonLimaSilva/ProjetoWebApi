import { perPage } from "./perPage.js";
import { criaLogsUser } from "../logsusers/logsUser.js";
import { modalEditar } from "./editaruser.js";
// import { changeTheme } from "./changeTheme.js";

export function criaLista(search = ''){

    console.log("entrou no criaLista");
    

    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

    console.log("dados no comeco do criaLista", usersadm[userOn.index].users);
    
    let tbody = document.getElementById('tbody-users') || false

     if(!tbody){
        return false
    }

    tbody.innerHTML=''

    usersadm[userOn.index].users.reverse()
    const state={
        page: 1,
        perPage: perPage,
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
        create(user, index){
            listaItems(user, tbody, index)
        },
        update( date = 0){
            html.get('#tbody-users').innerHTML = ""

            let page = state.page - 1
            let start = page * state.perPage
            let end = start + state.perPage

            let auxiliar=[]

            usersadm[userOn.index].users.forEach(function(user){

                let minName = user.name.toLowerCase()
                let minEmail = user.email.toLowerCase()
                let minStatus = user.status.toLowerCase()
                date = user.date
                if(minName.includes(search) || minEmail.includes(search) || minStatus.includes(search)){
                    if(date === user.date){
                        auxiliar.push(user)
                    } 
                }
            })

            state.totalPages= Math.ceil(auxiliar.length / perPage)
            const paginatedItems = auxiliar.slice(start, end)
    
            paginatedItems.forEach(function(user, index){
                list.create(user, index)
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


    function filter(){
        let cad = document.querySelector('#div-cad') || false

        if(cad){
            document.querySelector('#cad').addEventListener('click', function(e){
                
                criaLista()
            })
            document.querySelector('#cad-mes').addEventListener('click', function(e){
                let date = new Date;
                let mes= (date.getMonth() + 1)
                list.update(mes)
                criaLista()
            })
            document.querySelector('#cad-pend').addEventListener('click', function(e){
                
                criaLista('inativo')
            })
        }
    
    
    }
    filter()

    // changeTheme(usersadm[userOn.index].theme)
    console.log("dados no final do criaLista", usersadm[userOn.index].users);
}

function listaItems(user, tbody, index){
 
    let trbody = document.createElement('tr')
    let tdname = document.createElement('td')
    let tdemail = document.createElement('td')
    let tdativo = document.createElement('td')
    let tdmenu = document.createElement('td')
    
    tdname.textContent =   user.name
    tdemail.textContent =  user.email
    tdativo.textContent = user.status

    
        
    if(user.status === 'Ativo'){
    
        tdativo.style.color='green'
    }
    if(user.status === 'Inativo'){
        tdativo.style.color='red'
    }
    tdmenu.className=('tdmenu')
    tdmenu.style.maxwidth='max-content'
    

    let spanEditar =document.createElement('span')
    spanEditar.className='spanEditar'
    spanEditar.classList='span'
    spanEditar.style.height='2vh'
    spanEditar.style.width='2vh'
    spanEditar.style.borderRadius='1vh'
    spanEditar.style.padding='1vh 1vh'
    spanEditar.style.marginBottom='1vh'
    spanEditar.id='editar'

    spanEditar.addEventListener('click', ()=>{
        modalEditar(index, user)
    })

    let imgEditar = document.createElement('img')
    imgEditar.src='/img/svgEditar.svg'
    imgEditar.alt='Editar'
    imgEditar.style.width='2vh'
    imgEditar.className='imagem'

    let spanEditarBlack =document.createElement('span')
    spanEditarBlack.className='spanEditar'
    spanEditarBlack.style.height='2vh'
    spanEditarBlack.style.width='2vh'
    spanEditarBlack.style.borderRadius='1vh'
    spanEditarBlack.style.padding='1vh 1vh'
    spanEditarBlack.style.marginBottom='1vh'
    spanEditarBlack.id='editar-black'
    spanEditarBlack.addEventListener('click', ()=>{
        modalEditar(index, user)
    }) 

    let imgEditarBlack = document.createElement('img')
    imgEditarBlack.src='/img/svgEditar-black.svg'
    imgEditarBlack.alt='Editar'
    imgEditarBlack.style.width='2vh'
    imgEditarBlack.style.height='2vh'
    
    

    let spanRemover = document.createElement('span')
    spanRemover.className='spanRemover'
    spanRemover.classList='span'
    spanRemover.style.height='2vh'
    spanRemover.style.width='2vh'    
    spanRemover.style.borderRadius='1vh'
    spanRemover.style.padding='1vh 1vh'
    spanRemover.style.marginBottom='1vh'
    spanRemover.style.marginLeft='1vh'
    spanRemover.id='remover'
    spanRemover.addEventListener('click', ()=>{
        
        removeUser(index)
        showCad()
        showCadMes()
        showCadPend()
    })
    
    let imgRemover = document.createElement('img')
    imgRemover.src= '/img/delete.svg'
    imgRemover.alt='Remover'
    imgRemover.style.width='2vh'
    imgRemover.className='imagem'

    let spanRemoverBlack = document.createElement('span')
    spanRemoverBlack.classList='spanRemover'
    
    spanRemoverBlack.style.height='2vh'
    spanRemoverBlack.style.width='2vh'    
    spanRemoverBlack.style.borderRadius='1vh'
    spanRemoverBlack.style.padding='1vh 1vh'
    spanRemoverBlack.style.marginBottom='1vh'
    spanRemoverBlack.style.marginLeft='1vh'
    spanRemoverBlack.id='remover-black'
    spanRemoverBlack.addEventListener('click', ()=>{
        
        removeUser(index)
        showCad()
        showCadMes()
        showCadPend()
    })

    let imgRemoverBlack = document.createElement('img')
    imgRemoverBlack.src='/img/svgRemover-black.svg'
    imgRemoverBlack.alt='Editar'
    imgRemoverBlack.style.width='2vh'
    imgRemoverBlack.style.height='2vh'
    

    let spanMenu = document.createElement('span')
    spanMenu.className='menu2'
    spanMenu.style.height='2vh'
    spanMenu.style.width='2vh'    
    spanMenu.style.padding='0.5vh'
    spanMenu.style.border='0'
    spanMenu.addEventListener('click', ()=>{
        let deleteButton = document.querySelector('#button-delete')
        deleteButton.style.display='block'
        modalEditar(index, user)
    }) 

    let imgMenu = document.createElement('img')
    imgMenu.src='/img/menu2.svg'
    imgMenu.alt='Menu'
    imgMenu.style.width='2vh'
    imgMenu.style.height='2vh'
    
    spanEditar.appendChild(imgEditar)
    spanEditarBlack.appendChild(imgEditarBlack)
    spanRemover.appendChild(imgRemover)
    spanRemoverBlack.appendChild(imgRemoverBlack)
    spanMenu.appendChild(imgMenu)

    tdmenu.appendChild(spanEditar)
    tdmenu.appendChild(spanRemover)
    tdmenu.appendChild(spanEditarBlack)
    tdmenu.appendChild(spanRemoverBlack)
    tdmenu.appendChild(spanMenu)

    trbody.appendChild(tdname)
    trbody.appendChild(tdemail)
    trbody.appendChild(tdativo)
    
    trbody.appendChild(tdmenu)
    tbody.appendChild(trbody)

    

}

document.getElementById('search').addEventListener('input', function(e){
    let minSearch = this.value.toLowerCase()
    criaLista(minSearch)
})

export function removeUser(index){
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []
    
    
    usersadm[userOn.index].users.reverse()

    

    criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'deletou ', usersadm[userOn.index].users[index].email, 2)
    

    usersadm[userOn.index].users.splice(index, 1)

    usersadm[userOn.index].users.reverse()
    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    console.log('entoru aq');
    
    
    criaLista()
    
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
        c.appendChild(styleValue(contaCadMes(), 'green'))
    }
  
}
export function showCadPend(){
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
function contaCadMes(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let numcad = 0
    let date = new Date;
    let mes= (date.getMonth() + 1)
    usersadm[userOn.index].users.forEach(function(user, index){
        if(user.date === mes){
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
        if(user.status == 'Inativo'){
            numcad ++
        }
        
    })
    return numcad
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
