


function paginate(array, perPage){
    const state={
        page: 1,
        perPage,
        totalPages: Math.ceil(array.length / perPage)
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

            if(page > state.totalPges){
                state.page = state.totalPages
            }
        }, 
        creatListeners(){
            html.get('.fist').addEventListener('click', ()=>{
                controsls.goTo(1)
            })
            html.get('.last').addEventListener('click', ()=>{
                controsls.goTo(state.totalPages)
            })
            html.get('.prev').addEventListener('click', ()=>{
                controsls.prev()
            })
            html.get('.next').addEventListener('click', ()=>{
                controsls.next()
            })
        }
    }

    const list = {
        create(){

        },
        update(){
            html.get('#tbody-logs').innerHTML = ""

            let page = state.page - 1
            let start = page * state.perPage
            let end = start + state.perPage

            const paginatedItems = array.slice(start, end)
            
            paginatedItems.forEach(list.create());
        }

    }

    function init(){
        list.update()
        controsls.creatListeners()
    }



    init()
}