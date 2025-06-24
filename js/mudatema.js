

let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []



document.addEventListener('DOMContentLoaded', function(){

   let moon =document.getElementById('moon-theme')
   moon.className='show'
   
   document.getElementById('moon-theme').addEventListener('click', ()=>{
      if (usersadm[userOn.index].countclick < 2) {
         usersadm[userOn.index].countclick ++
      }
      mudaTema()
      
   })
   document.getElementById('sun-theme').addEventListener('click', ()=>{
      if (usersadm[userOn.index].countclick < 2) {
         usersadm[userOn.index].countclick ++
      }
      mudaTema()
      
   })
   mudaTema()

})

export function mudaTema(){

      let bodyLogin = document.querySelector('#body-login') || false
      let bodyRegistration = document.querySelector('#body-registration') || false
      let bodyTheme = document.querySelector('#body-theme')

      let a = document.querySelectorAll('a')

      let cabecalhocolor = document.querySelectorAll('.table-list thead th')

      let spanEditar = document.querySelectorAll('.spanEditar')
      let spanRemover = document.querySelectorAll('.spanRemover')

      let home = document.querySelector('#home')
      let cadastro = document.querySelector('#cadastro')
      let relatorio = document.querySelector('#relatorio')

      let homeblack = document.querySelector('#home-black')
      let cadastroblack = document.querySelector('#cadastro-black')
      let relatorioblack = document.querySelector('#relatorio-black')
      
      let editar = document.querySelectorAll('#editar')
      let editarblack = document.querySelectorAll('#editar-black')
      
      let remover = document.querySelectorAll('#remover')
      let removerblack = document.querySelectorAll('#remover-black')

      if(usersadm[userOn.index].countclick === 1){

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
         
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
      else if(usersadm[userOn.index].countclick === 2){


         if(bodyLogin){
            bodyLogin.className=''
         }
         if(bodyRegistration){
            bodyRegistration.className=''
         }
         if(bodyTheme){
            bodyTheme.classList=''
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
         
         usersadm[userOn.index].countclick=0
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
   }

