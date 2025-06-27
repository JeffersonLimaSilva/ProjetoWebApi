import { changeTheme } from "./changeTheme.js";
import { showName } from "./showName.js";
import { criaLogsUser } from "../logsusers/logsUser.js";

let countclick = 0

let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []

document.querySelector('#profile').addEventListener('click', ()=>{
    
    if(countclick < 2){
        countclick ++
    }
    console.log("entrou aq");
    
    changeTheme(usersadm[userOn.index].theme)
    profile()
    showName()
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


        let spanMoon = document.createElement('span')
        spanMoon.id='nav-moon-theme'
        spanMoon.className='change-theme'
        spanMoon.addEventListener('click', ()=>{
        
            if (usersadm[userOn.index].countclick < 2) {
                usersadm[userOn.index].countclick ++
                localStorage.setItem('usersadm', JSON.stringify(usersadm))
            }
            
            
            changeTheme(usersadm[userOn.index].theme)
        })

        let imgSun = document.createElement('img')
        imgMoon.src= '/img/sun.svg'
        imgMoon.alt='Sol'

        let spanSun = document.createElement('span')
        spanSun.className='change-theme'
        spanSun.id='nav-sun-theme'
        spanSun.addEventListener('click', ()=>{
           
            if (usersadm[userOn.index].countclick < 2) {
                usersadm[userOn.index].countclick ++
                localStorage.setItem('usersadm', JSON.stringify(usersadm))
            }
        
            
            changeTheme(usersadm[userOn.index].theme)
        })
        let divLogout = document.createElement('div')
        divLogout.className='div-logout'

        let spanLogout = document.createElement('span')
        spanLogout.addEventListener('click', function(e){
            
            let userOn = JSON.parse(localStorage.getItem('userOn')) || []
            let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
            
            criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'deslogou', '', 2)
    
            userOn.email = ''
            userOn.index = ''
            localStorage.setItem('userOn', JSON.stringify(userOn))
            
            window.location.href='/html/login.html' 
        })
        let p = document.createElement('p')
        p.innerHTML='SAIR'

        let divName = document.createElement('div')
        divName.className='perfil-nome'

        spanLogout.appendChild(p)
        divLogout.appendChild(spanLogout)

        spanMoon.appendChild(imgMoon)
        spanSun.appendChild(imgSun)

        spanClose.appendChild(imgClose)
        
        div.appendChild(spanClose)
        
        nav.appendChild(div)
        nav.appendChild(divName)
        nav.appendChild(divLogout)
        body.appendChild(overlayer)
        body.appendChild(nav)
        
    }
    if(countclick === 2){

        let nav = document.querySelector('.nav-profile')
        let div = document.querySelector('.div-profile')
        // let divName = document.querySelector('.perfil-nome')
        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')

        nav.removeChild(div)
        // nav.removeChild(divName)
        body.removeChild(overlayer)

        nav.className='profile-off'
        countclick = 0
    }
}


