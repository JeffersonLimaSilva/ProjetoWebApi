let countclick = 0

document.querySelector('#profile').addEventListener('click', ()=>{
    
    if(countclick < 2){
        countclick ++
    }
    profile()
}) 


function profile(){
    if(countclick === 1){
        let nav = document.createElement('div')
        nav.classList='nav-profile'

        let div = document.createElement('div')
        div.className='div-profile'

        let body = document.querySelector('.body')
        let overlayer = document.createElement('div')
        overlayer.className='overlayer'
        overlayer.addEventListener('click', ()=>{
        
            if(countclick < 2){
                countclick ++
            }
            profile()
        })

        let imgClose = document.createElement('img')
        imgClose.src= '/img/svgRemover.svg'
        imgClose.alt='Fechar'
        imgClose.style.width='4vh'
        imgClose.className='close-profile'

        let spanClose = document.createElement('span')
        spanClose.className='spanClose'
        spanClose.style.height='4vh'
        spanClose.style.width='4vh' 
        spanClose.style.border='solid 0.5vh black'
        spanClose.style.borderRadius='1vh'
        spanClose.style.padding='0.5vh'
        spanClose.style.marginTop='2vh'
        spanClose.style.marginLeft='1vh'
        spanClose.id='remover'
        spanClose.addEventListener('click', ()=>{
            if(countclick < 2){
                countclick ++
            }
            profile()
        })
        spanClose.appendChild(imgClose)
        div.appendChild(spanClose)
        nav.appendChild(div)
        body.appendChild(overlayer)
        body.appendChild(nav)
        
    }
    if(countclick === 2){

        let nav = document.querySelector('.nav-profile')
        let div = document.querySelector('.div-profile')
        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')

        nav.removeChild(div)
        body.removeChild(overlayer)

        nav.className='teste'
        countclick = 0
    }
}


