function criaListaLogs( search =''){

    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || []

    let tbody = document.getElementById('tbody-logs')
    tbody.innerHTML=''
    
    
    let perPage= 9

    const state={
        page: 1,
        perPage,
        totalPages: Math.ceil(logsuser[userOn.index].length / perPage)
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
            html.get('#tbody-logs').innerHTML = ""

            let page = state.page - 1
            let start = page * state.perPage
            let end = start + state.perPage

            const paginatedItems = logsuser[userOn.index].slice(start, end)
            
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

function listaItems(lista, tbody, search){
    let minName = lista.name.toLowerCase()
    let minEmail = lista.email.toLowerCase()
    let minInfor = lista.infor.toLowerCase()

    if(lista.data.includes(search) || minName.includes(search) || minEmail.includes(search) || minInfor.includes(search)){
        
        let trbody = document.createElement('tr')
        let tddate = document.createElement('td')
        let tdname = document.createElement('td')
        let tdemail = document.createElement('td')
        let tdaction = document.createElement('td')

        tddate.textContent =   lista.data
        tdname.textContent =   lista.name
        tdemail.textContent =  lista.email
        tdaction.textContent = lista.infor

        trbody.appendChild(tddate)
        trbody.appendChild(tdname)
        trbody.appendChild(tdemail)
        trbody.appendChild(tdaction)

        tbody.appendChild(trbody)
    }
}
document.getElementById('search').addEventListener('input', function(e){
    let minSearch = this.value.toLowerCase()
    criaListaLogs(minSearch)
    
})
criaListaLogs()