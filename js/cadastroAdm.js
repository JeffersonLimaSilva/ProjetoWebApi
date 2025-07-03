import { criaLogsUser } from "../logsusers/logsUser.js";
import { modalAlert } from "../modals/modals.js";


document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let nome = document.getElementById('cad-name')
    let email =document.getElementById('cad-email')
    let senha = document.getElementById('cad-password')

    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let index = usersadm.length
    if( nome.value == '' || email.value == '' || senha.value == ''){
        modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`);
        return false
    }
    if(!validaNome(nome.value)){
        modalAlert(`<p><strong>Nome Invalido.</strong></p>`);
        return false
    } 
    
    if(!validaEmail(email.value)){
        modalAlert(`<p><strong>Email Inválido.</strong></p>`);
        return false
    }

    if(verificaIgualEmailCad(usersadm, email.value)){
        modalAlert(`<p><strong>Email já cadastrado.</strong></p>`);
        return false
    }

    let useradm = {
        name: nome.value,
        email: email.value,
        password: senha.value,
        index: index,
        theme: false,
        users: [],
    }
    
    usersadm.push(useradm)

    criaLogsUser(nome, email, 'cadastrou-se', '', 1)

    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    localStorage.setItem('theme', JSON.stringify(useradm.theme))
    window.location.href='/login/login.html'

})

function verificaIgualEmailCad(usersadm, email){
    
    return usersadm.some(function(useradm){
        return useradm.email === email  
    })
}

function validaEmail(email){
    let regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    return regex.test(email)
}

function validaNome(nome){
    let rnome = /^[A-Z][a-z]+[\s][A-Z][a-z]+$/
    return rnome.test(nome)
}
