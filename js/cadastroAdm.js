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

    let useradm = {
        Name: nome.value,
        Email: email.value,
        Password: senha.value,
        
    }
    
    criaRegistro(useradm)

    criaLogsUser(nome, email, 'cadastrou-se', '', 1);

})


async function criaRegistro(register){
    const apiEndpoint = 'https://localhost:7114/api/Admin/add';
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(register)
            
            
        });
        window.location.href="/login/login.html"

    }
    catch (error) {
        console.error('Erro ao enviar produto para a API:', error);
        modalAlert($`<p><strong>Erro:${error}.</strong></p>`)
        throw error; 
    }
}



function validaEmail(email){
    let regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    return regex.test(email)
}

function validaNome(nome){
    let rnome = /^[A-Z][a-z]+[\s][A-Z][a-z]+$/
    return rnome.test(nome)
}
