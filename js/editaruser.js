import { showModal } from "./cadNewcad.js";
import { criaLista, showCadPend, removeUser } from "./lista.js";
import { criaLogsUser } from "./logsUser.js";

let auxI = null
let auxU = null


export function modalEditar(index, user){

    let modalClass = document.querySelector('.box-list-newcad')
    modalClass.className=('box-list-editar')

    let edit = document.getElementById('edit-input').checked = false
    console.log(edit);
    if(!edit){
        let inputNewCad = document.querySelectorAll('.box-list-editar input')
        let areaNewCad = document.querySelectorAll('.box-list-editar textarea')
        let pedit = document.querySelector('.edit-check')

        inputNewCad.forEach(function(input){
            input.className='edit-off'
        })
        areaNewCad.forEach(function(textarea){
            textarea.className='edit-off'
        })
        pedit.innerText='Off'
    }
    
    
    document.querySelector('.edit-span').addEventListener('click', ()=>{
        let edit = document.getElementById('edit-input').checked
        
        let modalcad = document.getElementById('modal')
        let pedit = document.querySelector('.edit-check')
        
        console.log(edit);
        if(edit){
            let editOn = document.querySelectorAll('.edit-off')
            editOn.forEach(function(text){
                text.className='edit-on'
            })
            pedit.innerText='On'
        }
        if(!edit){
            let editOn = document.querySelectorAll('.edit-on')
            editOn.forEach(function(text){
                text.className='edit-off'
            })
            pedit.innerText='Off'
        }

        modalcad.close()
        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')
        body.removeChild(overlayer)
        showModal()
    })

    document.getElementById('name').value = user.name
    document.getElementById('years-old').value = user.yearold
    document.getElementById('email').value = user.email
    if(user.status === 'Inativo'){
        document.getElementById('ativo').checked= false
    }
    if(user.status === 'Ativo'){
        document.getElementById('ativo').checked= true
    }
    
    
    document.getElementById('address').value =user.address
    document.getElementById('more-info').value =user.moreinfo
    document.getElementById('interesses').value =user.interests
    document.getElementById('sentimentos').value =user.emotions
    document.getElementById('valores').value =user.values

    

    let dialogClass = document.querySelector('.dialog-cad')
    dialogClass.className=('dialog-edit')

    let modaltitle = document.querySelector('.modaltitle')
    modaltitle.innerText='Editar Cadastro'
    
    auxI = index
    auxU = user

    showModal()
}

let buttonEditar =document.getElementById('button-editar') || false
if (buttonEditar) {
    buttonEditar.addEventListener('click', function(e){

        let index = auxI
        let user = auxU
        
        
        let modalcad = document.getElementById('modal')
        

        let nome = document.getElementById('name').value
        if(nome != user.name){
            
            
            editarUser(index, 'name', nome)
        }
        let idade = parseInt(document.getElementById('years-old').value)
        if(idade != user.yearold){
            
            editarUser(index, 'yearold', idade)
        }
        let email = document.getElementById('email').value
        if(email != user.email){
            
            editarUser(index, 'email', email)
        }
        let ativo = document.getElementById('ativo').checked
        if(ativo){
            let ativoInativo = 'Ativo'
            if (ativoInativo != user.status) {
                
                editarUser(index, 'status', ativoInativo)
            }
        }
        if(!ativo){
            let ativoInativo = 'Inativo'
            if (ativoInativo != user.status) {
                editarUser(index, 'status', ativoInativo)
            }
        }
        let endereco = document.getElementById('address').value
        if(endereco != user.address){
            editarUser(index, 'address', endereco)
        }
        let maisinformacoes = document.getElementById('more-info').value
        if(maisinformacoes != user.moreinfo){
            editarUser(index, 'moreinfo', maisinformacoes)
        }
        let interesses = document.getElementById('interesses').value
        if(interesses != user.interests){
            editarUser(index, 'interests', interesses)
        }
        let sentimentos = document.getElementById('sentimentos').value
        if(sentimentos != user.emotions){
            editarUser(index, 'emotions', sentimentos)
        }
        let valores = document.getElementById('valores').value
        if(valores != user.values){
            editarUser(index, 'values', valores)
        }
        

        let modalClass = document.querySelector('.box-list-editar') || false
        if(modalClass){
            modalClass.className=('box-list-newcad')
        }

        let dialogClass = document.querySelector('.dialog-edit') || false
        if (dialogClass) {
            dialogClass.className=('dialog-cad')
            
        }

    

        modalcad.close()

        

        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')
        body.removeChild(overlayer)

    })

    

}
let deleteButton = document.getElementById('button-delete') || false
if (deleteButton) {
    deleteButton.addEventListener('click', ()=>{
        let modalcad = document.getElementById('modal')
        let index = auxI

        alert("Cadastro Excluido")
        removeUser(index)
        modalcad.close()
        let body = document.querySelector('.body')
        let overlayer = document.querySelector('.overlayer')
        body.removeChild(overlayer)
    })
}


function editarUser(index, campo, conteudo){
    
    
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

        
    usersadm[userOn.index].users.reverse()
    usersadm[userOn.index].users[index][campo] = conteudo
    
    
    criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, `editou o(a) ${campo} de`, usersadm[userOn.index].users[index].email, 2)

    usersadm[userOn.index].users.reverse()
    localStorage.setItem('usersadm', JSON.stringify(usersadm))

    showCadPend()
    criaLista()
}


