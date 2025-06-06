let userOn=JSON.parse(localStorage.getItem('userOn')) || []
let usersadm =JSON.parse(localStorage.getItem('usersadm')) || []

let countclick=0

document.addEventListener('DOMContentLoaded', function(){
   function mudaTema(){
      let bodycolor= document.getElementsByTagName('body')
      let headercolor = document.getElementsByTagName('header')
      let navcolor = document.getElementsByTagName('nav')
      let navlogocolor = document.getElementsByClassName('nav-logo')
      let maincolor=document.querySelector('.main-box') || false
      let listcolor= document.querySelector('.div-list') || false
      let searchcolor = document.getElementById('search')
      
      
      let cadcolor=document.getElementById('div-cad') || false
      let cadmescolor=document.getElementById('div-mes')
      let cadpendcolor=document.getElementById('div-pend')

      let dialogcolor = document.getElementsByTagName('dialog') || false
      countclick++

      // console.log(usersadm[userOn.index].countclick);
      

      if(countclick === 1){
         bodycolor[0].style.backgroundColor='rgb(16 13 40)'
         bodycolor[0].style.color='white'
         headercolor[0].style.backgroundColor='rgb(28 23 61)'
         headercolor[0].style.boxShadow=' 0 6px 5px 1px #0000007a'
         navcolor[0].style.backgroundColor='rgb(28 23 61)'
         navcolor[0].style.boxShadow='3px 5px 5px 2px #0000007a'
         navlogocolor[0].style.backgroundColor='rgb(20 16 42)'
         
         if(maincolor){
            maincolor.style.backgroundColor='rgb(28 23 61)'
         }
         
         if(listcolor){
            listcolor.style.backgroundColor='rgb(28 23 61)'
         }
         searchcolor.style.backgroundColor='rgb(20 17 43)'
         if(cadcolor){
            cadcolor.style.backgroundColor='rgb(28 23 61)'
            cadmescolor.style.backgroundColor='rgb(28 23 61)'
            cadpendcolor.style.backgroundColor='rgb(28 23 61)'
         }
         if(dialogcolor){
            dialogcolor[0].style.backgroundColor='rgb(28 23 61)'
            dialogcolor[0].style.color='white'
         }
         
         // localStorage.setItem('usersadm', JSON.stringify(usersadm[userOn.index]))
      }else if(countclick === 2){
         bodycolor[0].style.backgroundColor='rgb(236, 236, 236)'
         bodycolor[0].style.color='rgb(68, 68, 68)'
         headercolor[0].style.backgroundColor='rgb(206, 206, 206)'
         headercolor[0].style.boxShadow=''
         navcolor[0].style.backgroundColor='white'
         navcolor[0].style.boxShadow='2px 5px 5px rgb(182, 182, 182)'
         navlogocolor[0].style.backgroundColor='rgb(204, 201, 212)'
         if(maincolor){
            maincolor.style.backgroundColor='white'
         }
         
         if(listcolor){
            listcolor.style.backgroundColor='white'
         }
         searchcolor.style.backgroundColor='white'
         if(cadcolor){
            cadcolor.style.backgroundColor='white'
            cadmescolor.style.backgroundColor='white'
            cadpendcolor.style.backgroundColor='white'
         }
         if(dialogcolor){
            dialogcolor[0].style.backgroundColor='white'
            dialogcolor[0].style.color='black'
         }
         console.log("Segundo Click");
         countclick=0
         // localStorage.setItem('usersadm', JSON.stringify(usersadm[userOn.index]))
      }
      
   
   }
   
   document.getElementById('muda-tema').addEventListener('click', ()=>{
      mudaTema()
      
   })

})

