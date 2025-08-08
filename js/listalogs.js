import { perPage } from "./perPage.js";

export async function criaListaLogs(){

    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

    let tbody = document.getElementById('tbody-logs') || false

    if(!tbody){
        return false
    }
    tbody.innerHTML=''
    const state={
        page: 1,
        perPage: perPage,
        totalPages: 1,
        search: null
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
                this.buttons();
            })
            html.get('.last').addEventListener('click', ()=>{
                controsls.goTo(state.totalPages);
                update();
                this.buttons();
            })
            html.get('.prev').addEventListener('click', ()=>{
                controsls.prev();
                update();
                this.buttons();

            })
            html.get('.next').addEventListener('click', ()=>{
                controsls.next();
                update();
                this.buttons();
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
        create(lista){
            listaItems(lista, tbody, search)
        },
        async update(){
            var Logs;
            var totalItens;
            if(state.search){
                var resultSearch = await LogsListApiSearch(state.search, state.page -1, state.perPage);
                Logs = resultSearch.listLogs;
                totalItens = resultSearch.totalQueryLogs;
            }
            else{
                Logs = await LogsListApi(userOn.id, state.page - 1, state.perPage);
                totalItens = await countLogs();
            }
            
            state.totalPages = Math.ceil(totalItens / state.perPage) == 0 ? 1 : Math.ceil(totalItens / state.perPage);              
                
            html.get('#tbody-logs').innerHTML = "";       

            if(Logs && Logs.length > 0){
                Logs.forEach(function(log, index){
                    list.create(log);
                });
            }
            else{
                html.get('#tbody-logs').innerHTML = '<tr><td></td><td>Nenhum log encontrado.</td><td></td><td></td></tr>';
            }
        }

    }

    async function init(){
        list.update();
        controsls.creatListeners();
        await new Promise(resolve => setTimeout(resolve, 200));
        controsls.buttons();
        number();
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
    init()

}
async function LogsListApi(id, page, perPage){
    
    const apiEndpoint = `https://localhost:7114/api/Admin/${id}/list-logs?pageNumber=${page}&pageSize=${perPage}`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'

            }
        });
        var data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}
export async function countLogs() {
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    const apiEndpoint = `https://localhost:7114/api/Admin/${userOn.id}/total-logs`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'
            },
        });
        var data = await response.json();        
        return data;
    }
    catch(error){
        throw error;
    }
}
function listaItems(log, tbody){
    
    let trbody = document.createElement('tr')
    let tddate = document.createElement('td')
    let tdname = document.createElement('td')
    let tdemail = document.createElement('td')
    let tdaction = document.createElement('td')

    tddate.textContent =   log.timestamp;
    tdname.textContent =   log.adminName; 
    tdemail.textContent =  log.adminEmail;
    tdaction.textContent = log.action;

    

    trbody.appendChild(tddate)
    trbody.appendChild(tdname)
    trbody.appendChild(tdemail)
    trbody.appendChild(tdaction)

    tbody.appendChild(trbody)
    
}
async function LogsListApiSearch(query, page, perPage){
    try{
        let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
        const apiEndpoint = `https://localhost:7114/api/Admin/${userOn.id}/search-list?query=${query}&pageNumber=${page}&pageSize=${perPage}`;

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
