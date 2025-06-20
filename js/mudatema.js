

 let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []



document.addEventListener('DOMContentLoaded', function(){

   mudaTema()

   document.getElementById('muda-tema').addEventListener('click', ()=>{
      if (usersadm[userOn.index].countclick < 2) {
         usersadm[userOn.index].countclick ++
      }
      mudaTema()
      
   })

   

})

export function mudaTema(){
      let bodycolor= document.getElementsByTagName('body')
      let headercolor = document.getElementsByTagName('header')
      let navcolor = document.getElementsByTagName('nav')
      
      let maincolor=document.querySelector('.main-box') || false
      let listcolor= document.querySelector('.div-list') || false
      let searchcolor = document.getElementById('search')
      
      
      let cadcolor=document.getElementById('div-cad') || false
      let cadmescolor=document.getElementById('div-mes')
      let cadpendcolor=document.getElementById('div-pend')

      let dialogcolor = document.querySelector('#modal-cad') || false

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
         bodycolor[0].style.backgroundColor='rgb(16 13 40)'
         bodycolor[0].style.color='white'
         headercolor[0].style.backgroundColor='rgb(28 23 61)'
         headercolor[0].style.boxShadow=' 0 6px 5px 1px #0000007a'
         navcolor[0].style.backgroundColor='rgb(28 23 61)'
         navcolor[0].style.boxShadow='3px 5px 5px 2px #0000007a'
         
         home.className=''
         cadastro.className=''
         relatorio.className=''
         

         homeblack.className='image'
         cadastroblack.className='image'
         relatorioblack.className='image'
         

         document.querySelector('.home').addEventListener('mouseout', ()=>{
            let homeblack = document.querySelector('#home-black')
            let home = document.querySelector('#home')
            homeblack.className='image'
            home.className=''

         })
         document.querySelector('.cadastro').addEventListener('mouseout', ()=>{
            let cadastroblack = document.querySelector('#cadastro-black')
            let cadastro = document.querySelector('#cadastro')
            cadastroblack.className='image'
            cadastro.className=''

         })
         document.querySelector('.relatorio').addEventListener('mouseout', ()=>{
            let relatorioblack = document.querySelector('#relatorio-black')
            let relatorio = document.querySelector('#relatorio')
            relatorioblack.className='image'
            relatorio.className=''

         })

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

         a.forEach(function(a){
            a.style.color='white'
         })

         cabecalhocolor.forEach(function(th){
            th.style.backgroundColor='rgba(255, 143, 30, 1)'
            th.style.boxShadow='box-shadow: 5px 2px 2px 9px rgba(0, 0, 0, 0.75);'
         })
         
         if(maincolor){
            maincolor.style.backgroundColor='rgb(28 23 61)'
         }
         
         if(listcolor){
            listcolor.style.backgroundColor='rgb(28 23 61)'
         }
         searchcolor.style.backgroundColor='rgb(20 17 43)'
         searchcolor.style.color='white'
         if(cadcolor){
            cadcolor.style.backgroundColor='rgb(28 23 61)'
            cadcolor.style.boxShadow='0 0 0 0'
            cadmescolor.style.backgroundColor='rgb(28 23 61)'
            cadmescolor.style.boxShadow='0 0 0 0'
            cadpendcolor.style.backgroundColor='rgb(28 23 61)'
            cadpendcolor.style.boxShadow='0 0 0 0'
         }
         if(dialogcolor){
            dialogcolor.style.backgroundColor='rgb(28 23 61)'
            dialogcolor.style.color='white'
         }
         
         spanEditar.forEach(function(span){
            span.style.border='solid 0.1px rgba(255, 143, 30, 1)'
         })
         spanRemover.forEach(function(span){
            span.style.border='solid 0.1px rgba(255, 143, 30, 1)'
         })
         
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
      else if(usersadm[userOn.index].countclick === 2){
         bodycolor[0].style.backgroundColor='rgb(236, 236, 236)'
         bodycolor[0].style.color='rgb(68, 68, 68)'
         navcolor[0].style.backgroundColor='white'
         navcolor[0].style.boxShadow='2px 5px 5px rgb(182, 182, 182)'

         home.className='image'
         cadastro.className='image'
         relatorio.className='image'
         
         homeblack.className=''
         cadastroblack.className=''
         relatorioblack.className=''

         document.querySelector('.home').addEventListener('mouseout', ()=>{
            let homeblack = document.querySelector('#home-black')
            let home = document.querySelector('#home')
            homeblack.className=''
            home.className='image'

         })
         document.querySelector('.cadastro').addEventListener('mouseout', ()=>{
            let cadastroblack = document.querySelector('#cadastro-black')
            let cadastro = document.querySelector('#cadastro')
            cadastroblack.className=''
            cadastro.className='image'

         })
         document.querySelector('.relatorio').addEventListener('mouseout', ()=>{
            let relatorioblack = document.querySelector('#relatorio-black')
            let relatorio = document.querySelector('#relatorio')
            relatorioblack.className=''
            relatorio.className='image'

         })

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

         a.forEach(function(a){
            a.style.color='rgb(68, 68, 68)'
         })

         cabecalhocolor.forEach(function(th){
            th.style.backgroundColor='rgb(28, 23, 61)'
         })

         if(maincolor){
            maincolor.style.backgroundColor='white'
         }
         
         if(listcolor){
            listcolor.style.backgroundColor='white'
         }
         searchcolor.style.backgroundColor=''
         searchcolor.style.color=''
         if(cadcolor){
            cadcolor.style.backgroundColor=''
            cadmescolor.style.backgroundColor=''
            cadpendcolor.style.backgroundColor=''

         }
         if(dialogcolor){
            dialogcolor.style.backgroundColor='white'
            dialogcolor.style.color='black'
         }
         spanEditar.forEach(function(span){
            span.style.border='0.1px solid rgb(68, 68, 68)'
         })
         spanRemover.forEach(function(span){
            span.style.border='0.1px solid rgb(68, 68, 68)'
         })
         
         usersadm[userOn.index].countclick=0
         localStorage.setItem('usersadm', JSON.stringify(usersadm))
      }
      
   
   }

