

let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []



document.addEventListener('DOMContentLoaded', function(){

   let moon =document.getElementById('moon-theme')
   moon.className='show'
   
   document.getElementById('moon-theme').addEventListener('click', ()=>{
      
      
      if (usersadm[userOn.index].countclick < 2) {
         usersadm[userOn.index].countclick ++
      }
      mudaTema(usersadm[userOn.index].countclick)
      
   })
   document.getElementById('sun-theme').addEventListener('click', ()=>{
      if (usersadm[userOn.index].countclick < 2) {
         usersadm[userOn.index].countclick ++
      }
      mudaTema(usersadm[userOn.index].countclick)
      
   })
   mudaTema(usersadm[userOn.index].countclick)

})

export function mudaTema(countclick){

   // let userOn=JSON.parse(localStorage.getItem('userOn')) || []
   // let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []
   

      let bodyLogin = document.querySelector('#body-login') || false
      let bodyRegistration = document.querySelector('#body-registration') || false
      let bodyTheme = document.querySelector('#body-theme')
      
      let editar = document.querySelectorAll('#editar')
      let editarblack = document.querySelectorAll('#editar-black')
      
      let remover = document.querySelectorAll('#remover')
      let removerblack = document.querySelectorAll('#remover-black')

      if(countclick === 1){

         if(bodyLogin){
            bodyLogin.className='theme-black'
         }
         if(bodyRegistration){
            bodyRegistration.className='theme-black'
         }
         if(bodyTheme){
            bodyTheme.classList.add('theme-black')
         }
         

         editar.forEach(function(span){
            span.className=''
         
         })
         remover.forEach(function(span){
            span.className=''
         })
         
         editarblack.forEach(function(span){
            span.className='span'
         
         })
         removerblack.forEach(function(span){
            span.className='span'
         })

         let moon =document.getElementById('moon-theme')
         moon.className='change-theme'
         

         let sun =document.getElementById('sun-theme')
         sun.className='show'

         let navmoon =document.querySelector('#nav-moon-theme') || false
         console.log(navmoon);
         
         if(navmoon){
            console.log("entrou aq");
            
            navmoon.className='change-theme'
         }
         
         let navsun =document.querySelector('#nav-sun-theme') || false
         console.log(navsun);
         
         if(navsun){
            console.log("entrou aq");
            navsun.className='show'
         }
         
         
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
      else if(countclick === 2){


         if(bodyLogin){
            bodyLogin.className=''
         }
         if(bodyRegistration){
            bodyRegistration.className=''
         }
         if(bodyTheme){
            bodyTheme.className='body'
         }

      

         editar.forEach(function(span){
            span.className='span'
         
         })
         remover.forEach(function(span){
            span.className='span'
         })
         
         editarblack.forEach(function(span){
            span.className=''
         
         })
         removerblack.forEach(function(span){
            span.className=''
         })

         let moon =document.getElementById('moon-theme')
         moon.className='show'

         let sun =document.getElementById('sun-theme')
         sun.className='change-theme'

         // let navmoon =document.getElementById('nav-moon-theme') || false
         // if(navmoon){
         //    navmoon.className='show'
         // }
         
         // let navsun =document.getElementById('nav-sun-theme')
         // if(navsun){
         //    navsun.className='change-theme'
         // }

         usersadm[userOn.index].countclick=0
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
   }

