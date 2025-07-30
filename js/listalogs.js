import { perPage } from "./perPage.js";

export async function criaListaLogs( search =''){

    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

    let tbody = document.getElementById('tbody-logs') || false

    if(!tbody){
        return false
    }
    tbody.innerHTML=''
    const state={
        page: 1,
        perPage: perPage,
        totalPages: Math.ceil(await countLogs() / perPage)
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
        create(lista){
            listaItems(lista, tbody, search)
        },
        async update(){

            var Logs = await LogsListApi(userOn.id, state.page - 1, state.perPage);  
            html.get('#tbody-logs').innerHTML = "";
            
            Logs.forEach(function(log){
                list.create(log)
               
            });
        }

    }

    function init(){
        list.update();
        controsls.creatListeners();
        controsls.buttons();
        number();
    }

    function update(){
        list.update();
        number();
    }

    function number(){
        html.get('.number div').innerHTML = `${state.page} / ${state.totalPages}`;
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
        var data = response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
}
async function countLogs() {
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
document.getElementById('search').addEventListener('input', function(e){
    let minSearch = this.value.toLowerCase()
    criaListaLogs(minSearch)
    
})
await criaListaLogs();
