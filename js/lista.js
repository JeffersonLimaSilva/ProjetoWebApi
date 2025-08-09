import { perPage } from "./perPage.js";
import { modalEditar } from "./editaruser.js";
import { modalConfirm } from "../modals/modals.js";
import { countRegistration } from "../Dashboard//dashboard.js";


export async function criaLista(){
    
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []; 
      
    let tbody = document.getElementById('tbody-users') || false;

    if(!tbody){
        return false;
    }
    tbody.innerHTML='';
    const state={
        page: 1,
        perPage: perPage,
        totalPages: 1,
        search: null,
        delete: false
    };
    const html ={
        get(element){
            return document.querySelector(element)
        }
    };
    const controsls={
        next(){
            state.page++;
            const lastPage = state.page > state.totalPages;
            if(lastPage){
                state.page --;
            }
        },
        prev(){
            state.page -- ;
            if (state.page < 1){
                state.page ++ ;
            }   
        },
        goTo(page){
            if(page < 1){
                page = 1 ;
            }
            state.page = page;

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
                fist.style.color = "rgb(163, 163, 163)";
                var prev = html.get('.prev')
                prev.style.color = "rgb(163, 163, 163)";
            }else{
               var fist = html.get('.fist')
                fist.style.color = "var(--cor-font)";
                var prev = html.get('.prev')
                prev.style.color = "var(--cor-font)"; 
            }
            if(state.page == state.totalPages){
                var fist = html.get('.next')
                fist.style.color = "rgb(163, 163, 163)";
                var prev = html.get('.last')
                prev.style.color = "rgb(163, 163, 163)";
            }else{
                var fist = html.get('.next')
                fist.style.color = "var(--cor-font)";
                var prev = html.get('.last')
                prev.style.color = "var(--cor-font)";
            }
        }
    }

    const list = {
        create(client, index){
            listaItems(client, tbody, index)
        },
        async update(){
            var clients;
            var totalItens;
            if(state.search){
                var resultSearch = await ClientsListApiSearch(state.search, state.page -1, state.perPage);
                clients = resultSearch.listClients;
                totalItens = resultSearch.totalQueryClients;
            }
            else if(state.delete){
                var resultsDeleted = await ClientsDeletedListApi(userOn.id, state.page - 1, state.perPage);
                clients = resultsDeleted.listClients;
                totalItens = resultsDeleted.totalQueryClients;
            }
            else{
                clients = await ClientsListApi(userOn.id, state.page - 1, state.perPage);
                totalItens = await countRegistration();
            }
            
            state.totalPages = Math.ceil(totalItens / state.perPage) == 0 ? 1 : Math.ceil(totalItens / state.perPage);              
             
            html.get('#tbody-users').innerHTML = "";       

            if(clients && clients.length > 0){
                clients.forEach(function(client, index){
                    list.create(client, index);
                });
            }
            else{
                var cadbox = html.get('#cad-box') || false;
                if(cadbox){
                    html.get('#tbody-users').innerHTML = '<tr><td></td><td>Nenhum cliente encontrado.</td><td></td><td></td><td></td></tr>';
                }
                else{
                    html.get('#tbody-users').innerHTML = '<tr><td></td><td>Nenhum cliente encontrado.</td><td></td><td></td></tr>';
                }
            }
        }
    }

    async function init(){
        
        list.update();
        controsls.creatListeners();
        await new Promise(resolve => setTimeout(resolve, 200));

        controsls.buttons();
        number();
        filter();
    }

    async function update(){
        list.update();
        await new Promise(resolve => setTimeout(resolve, 100));
        controsls.buttons();
        number();
    }

    function number(){
        html.get('.number div').innerHTML = `${state.page} / ${state.totalPages}`;
    }

    var listDelete = html.get('#box-delete') || false;
    if (listDelete) {
        state.delete = true;
        state.page = 1;
        update();
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

    let search = document.getElementById('search') || false;
    if (search) {
        var timeoutId;
        search.addEventListener('input',  function(e){
            let minSearch = this.value.toLowerCase();
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                state.page = 1;
                state.search = minSearch == ''? null: minSearch;
                update();
            }, 500);
        })
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
            }
            
        });
        var data = response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
    
}
async function ClientsListApiSearch(query, page, perPage){
    try{
        let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
        const apiEndpoint = `https://localhost:7114/api/Client/${userOn.id}/search-list?query=${query}&pageNumber=${page}&pageSize=${perPage}`;

        const response = await fetch(apiEndpoint, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(!response.ok){
            var errorResponseData = await response.json().catch(()=>({}));
            throw new Error(errorResponseData.message);
        }
        var data = await response.json();
        return data;
    }
    catch(error){
        console.error(error)
    }
}

async function ClientsDeletedListApi(id, page, perPage){
    
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/deleted-list?pageNumber=${page}&pageSize=${perPage}`;
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

