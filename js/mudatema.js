let clickCount=0
let time

document.getElementById('muda-tema').addEventListener('click', ()=>{

   let bodycolor= document.getElementsByTagName('body')
   let headercolor = document.getElementsByTagName('header')
   let navcolor = document.getElementsByTagName('nav')
   let navlogocolor = document.getElementsByClassName('nav-logo')
   let maincolor=document.querySelector('.main-box') || false
   let listcolor= document.querySelector('.div-list') || false
   let searchcolor = document.getElementById('search')
   console.log(searchcolor);
   
   let cadcolor=document.getElementById('div-cad') || false
   let cadmescolor=document.getElementById('div-mes')
   let cadpendcolor=document.getElementById('div-pend')
   clickCount++

   if(clickCount === 1){
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
      
      console.log(maincolor);
      
      
   }else if(clickCount === 2){
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
         listcolor[0].style.backgroundColor='white'
      }
      searchcolor.style.backgroundColor='white'
      if(cadcolor){
         cadcolor.style.backgroundColor='white'
         cadmescolor.style.backgroundColor='white'
         cadpendcolor.style.backgroundColor='white'
      }
      console.log("Segundo Click");
      clickCount=0
   }
   
   
   
})
