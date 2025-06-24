let countclick = 0

document.querySelector('.menuhead').addEventListener('click', ()=>{
    
    if(countclick < 2){
        countclick ++
    }
    menu()
}) 
document.querySelector('.menunav').addEventListener('click', ()=>{
    if(countclick < 2){
        countclick ++
    }
    menu()
})

function menu(){
    if(countclick === 1){
        let nav = document.querySelector('.nav-div')
        nav.classList='nav-menu'

        let body = document.querySelector('.body')
        let overlayer = document.createElement('div')
        overlayer.className='overlayer'
        overlayer.addEventListener('click', ()=>{
        
            if(countclick < 2){
                countclick ++
            }
            menu()
        })
        body.appendChild(overlayer)
        
        
    }
    if(countclick === 2){

        let nav = document.querySelector('.nav-menu')

        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')
        body.removeChild(overlayer)

        nav.classList='nav-div'
        countclick = 0
    }
}