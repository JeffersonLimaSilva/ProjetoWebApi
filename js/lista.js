import { perPage } from "./perPage.js";
import { modalEditar } from "./editaruser.js";
import { modalConfirm } from "../modals/modals.js";
import { countRegistration } from "../Dashboard//dashboard.js";


export async function criaLista(search = '', date = 0){
    
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    
      
    let tbody = document.getElementById('tbody-users') || false

     if(!tbody){
        return false
    }

    tbody.innerHTML=''    
    const state={
        page: 1,
        perPage: perPage,
        totalPages: Math.ceil(await countRegistration() / perPage) 
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
                controsls.goTo(1);
                update();
                controsls.buttons();
            })
            html.get('.last').addEventListener('click', ()=>{
                controsls.goTo(state.totalPages);
                update();
                controsls.buttons();
            })
            html.get('.prev').addEventListener('click', ()=>{
                controsls.prev();
                update();
                controsls.buttons();
            })
            html.get('.next').addEventListener('click', ()=>{
                controsls.next();
                update();
                controsls.buttons();                
            })
        },
        buttons(){
            if(state.page == 1){
                var fist = html.get('.fist')
                fist.style.opacity = 0;
                var prev = html.get('.prev')
                prev.style.opacity = 0;
            }else{
               var fist = html.get('.fist')
                fist.style.opacity = 1;
                var prev = html.get('.prev')
                prev.style.opacity = 1; 
            }
            if(state.page == state.totalPages){
                var fist = html.get('.next')
                fist.style.opacity = 0;
                var prev = html.get('.last')
                prev.style.opacity = 0;
            }else{
                var fist = html.get('.next')
                fist.style.opacity = 1;
                var prev = html.get('.last')
                prev.style.opacity = 1;
            }
        }
    }

    const list = {
        create(client, index){
            listaItems(client, tbody, index)
        },
        async update(){
            var clients = await ClientsListApi(userOn.id, state.page - 1, state.perPage);   
             
            html.get('#tbody-users').innerHTML = "";       

            clients.forEach(function(client, index){
                list.create(client, index);
            });
        }
    }

    function init(){
        
        list.update();

        controsls.creatListeners();
        controsls.buttons();
        number();
        filter();
    }

    function update(){
        list.update()
        number()
    }

    function number(){
        html.get('.number div').innerHTML = `${state.page} / ${state.totalPages}`
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
                criaLista('', mes)
                
            })
            document.querySelector('#cad-pend').addEventListener('click', function(e){
                
                criaLista('inativo')
            })
        }
    
    }
    
}

async function ClientsListApi(id, page, perPage){
    
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/list?pageNumber=${page}&pageSize=${perPage}`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'

            }
        });
        var data = response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
}
async function GetClientsByIdApi(id){
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/get-by-id`;
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${userOn.token}`
            },
            
        });
        var data = response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
    
}

async function listaItems(client, tbody, index){
    let isCad = document.querySelector('#cad-box') || false
    let trbody = document.createElement('tr')
    let tddate = document.createElement('td')
    let tdname = document.createElement('td')
    let tdemail = document.createElement('td')
    let tdativo = document.createElement('td')
    
    
    tddate.textContent =   client.date;
    tdname.textContent =   client.name;
    tdemail.textContent =  client.email;
    tdativo.textContent = client.status;

    if(client.status === 'Ativo'){
    
        tdativo.style.color='green'
    }
    if(client.status === 'Inativo'){
        tdativo.style.color='red'
    }
    trbody.appendChild(tddate)
    trbody.appendChild(tdname)
    trbody.appendChild(tdemail)
    trbody.appendChild(tdativo)

    if(isCad){
            let tdmenu = document.createElement('td')
        tdmenu.className=('tdmenu')
        tdmenu.style.maxwidth='max-content'
        

        let spanEditar =document.createElement('span')
        spanEditar.className='spanEditar'
        spanEditar.classList='span'
        spanEditar.id='editar'

        spanEditar.addEventListener('click', async ()=>{
            modalEditar(await GetClientsByIdApi(client.id));
        })

        let imgEditar = document.createElement('img')
        imgEditar.src='/img/svgEditar.svg'
        imgEditar.alt='Editar'
        imgEditar.className='icon-white'

        let imgEditarBlack = document.createElement('img')
        imgEditarBlack.src='/img/svgEditar-black.svg'
        imgEditarBlack.alt='Editar'
        imgEditarBlack.className='icon-black'

        let spanRemover = document.createElement('span')
        spanRemover.className='spanRemover'
        spanRemover.classList='span'
        spanRemover.id='remover'
        spanRemover.addEventListener('click', ()=>{
            modalConfirm(client.id, client.email)
        })
        
        let imgRemover = document.createElement('img')
        imgRemover.src= '/img/delete.svg'
        imgRemover.alt='Remover'
        imgRemover.className='icon-white'

        let imgRemoverBlack = document.createElement('img')
        imgRemoverBlack.src='/img/delete-black.svg'
        imgRemoverBlack.alt='Editar'
        imgRemoverBlack.className='icon-black'

        let spanMenu = document.createElement('span')
        spanMenu.className='menu2'    
        spanMenu.style.padding='0.5vh'
        spanMenu.style.border='0'
        spanMenu.addEventListener('click',async ()=>{
            let deleteButton = document.querySelector('#button-delete')
            deleteButton.style.display='block'
            modalEditar(await GetClientsByIdApi(client.id));
        }) 

        let imgMenu = document.createElement('img')
        imgMenu.src='/img/menu2.svg'
        imgMenu.alt='Menu'
        
        spanEditar.appendChild(imgEditar)
        spanEditar.appendChild(imgEditarBlack)
        spanRemover.appendChild(imgRemover)
        spanRemover.appendChild(imgRemoverBlack)
        spanMenu.appendChild(imgMenu)

        tdmenu.appendChild(spanEditar)
        tdmenu.appendChild(spanRemover)
        tdmenu.appendChild(spanMenu)
        trbody.appendChild(tdmenu)
    }
    tbody.appendChild(trbody)
}
let search = document.getElementById('search') || false;
if (search) {
    search.addEventListener('input', function(e){
        let minSearch = this.value.toLowerCase()
        criaLista(minSearch)
    })
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



// criaLista() 

