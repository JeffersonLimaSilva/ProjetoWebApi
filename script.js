

// function styleValue(x, colorC){
//     var valueCad = document.createElement('span')
//     valueCad.textContent = x;
//     valueCad.style.color = colorC;
//     valueCad.style.fontSize= '55px' 
//     valueCad.style.marginTop= '10px'

//     return valueCad
// }

// function showCad(){
    
//     let c = document.getElementById('cad')
//     c.innerHTML=''
//     c.appendChild(styleValue(contaCad(), 'blue'))
// }
// function showCadMes(){
//     let c = document.getElementById('cad-mes')
//     c.innerHTML=''
//     c.appendChild(styleValue(contaCad(), 'green'))
// }
// function showCadPend(){
//     let c = document.getElementById('cad-pend')
//     c.innerHTML=''
//     c.appendChild(styleValue(contaInativo(), 'red'))
// }
// function contaCad(){
//     let userOn = JSON.parse(localStorage.getItem('userOn')) || []
//     let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
//     let numcad = 0
//     usersadm[userOn.index].users.forEach(function(user, index){
//         if(usersadm[userOn.index].users == []){
//             return 0
//         }
//         if(index >= numcad){
//             numcad = index 
//             numcad ++
//         }
        
//     })

//     return numcad
// }
// function contaInativo(){
//     let userOn = JSON.parse(localStorage.getItem('userOn')) || []
//     let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
//     let numcad = 0

//     usersadm[userOn.index].users.forEach(function(user){
//         if(user.ativo == 'Inativo'){
//             numcad ++
//         }
        
//     })
//     return numcad
// }


// let listDiv= document.querySelectorAll('.list-div')
// listDiv.forEach((campoList, index) => {
//     let spanRm = document.getElementsByClassName('spanRemover')

    
    
// })
    
// document.querySelector('.spanRemover').addEventListener('click', function(e){
//         alert("apagou",index)
//         showCad()
//         console.log('PASSOU ALERT', index)
//         showCadMes()
//         console.log("PASSOU MES", index)
//         showCadPend()
//         console.log("PASSOU PEND", index)
//         criaLista()
//         console.log("PASSOU list" ,index)

// })


// showCad()
// showCadMes()
// showCadPend()


