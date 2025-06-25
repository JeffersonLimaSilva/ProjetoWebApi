import { mudaTema } from "./mudatema.js";


let countclick = 0

let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []

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
        
        spanClose.style.marginLeft='1vh'
        spanClose.id='remover'
        spanClose.addEventListener('click', ()=>{
            if(countclick < 2){
                countclick ++
            }
            profile()
        })
        let imgMoon = document.createElement('img')
        imgMoon.src= '/img/moon.svg'
        imgMoon.alt='Lua'
        imgMoon.className='close-profile'


        let spanMoon = document.createElement('span')
        spanMoon.className='change-theme'
        spanMoon.addEventListener('click', ()=>{
            console.log("passou aq");
            console.log(usersadm[userOn.index].countclick);
            
            if (usersadm[userOn.index].countclick < 2) {
                console.log(usersadm[userOn.index].countclick);
                usersadm[userOn.index].countclick ++
                localStorage.setItem('usersadm', JSON.stringify(usersadm))
            }
            console.log(usersadm[userOn.index].countclick);
            
            mudaTema()
        })
        let spanSun = document.createElement('span')
        spanSun.id='sun-theme'
        spanSun.className='change-theme'

        spanMoon.appendChild(imgMoon)
        spanClose.appendChild(imgClose)
        
        div.appendChild(spanClose)
        div.appendChild(spanMoon)
        div.appendChild(spanSun)
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


