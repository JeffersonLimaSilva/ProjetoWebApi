export let indexCad = 0
function criaLista(){

    let users= JSON.parse(localStorage.getItem('users')) || []
    

    users.forEach(function(user){

        let divlist=document.querySelector('.div-box-list')
        let divDivList = document.createElement('div')
        divDivList.classList.add('list-div')
        
        let list = document.createElement('div')
        list.classList.add('box-list')
        list.style.height='25px'
        list.style.alignItems='center'
        list.style.padding='0px 5px'
        let spanNome= document.createElement('span')
        spanNome.textContent= user.name
        
        let spanEmail = document.createElement('span')
        spanEmail.textContent= user.email
        
        let spanStatus = document.createElement('span')
        spanStatus.textContent = user.ativo
        spanStatus.style.textAlign= 'end'
        spanStatus.style.paddingRight= '20px'
        let hrlist = document.createElement('hr')
        hrlist.classList.add('list-line')
        hrlist.style.width='980px'
        hrlist.style.height='0.1px'
        

        list.appendChild(spanNome)
        list.appendChild(spanEmail)
        list.appendChild(spanStatus)
        divDivList.appendChild(list)
        divDivList.appendChild(hrlist)
        divlist.appendChild(divDivList)

        indexCad++
    });

    
        
     
}
document.addEventListener('DOMContentLoaded', function(e){

        let listDiv =document.querySelectorAll('.list-div')

        listDiv.forEach(function(compoList){
            
            compoList.addEventListener('mouseover', function(e){
                let boxList=this.querySelector('.box-list')
                boxList.style.backgroundColor='rgb(207, 207, 243)'
                boxList.style.borderRadius='3px'
            })
            compoList.addEventListener('mouseout', function(e){
                let boxList=this.querySelector('.box-list')
                boxList.style.backgroundColor=''
            })

        })


    })
criaLista()