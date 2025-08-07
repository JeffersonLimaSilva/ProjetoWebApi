import { criaLogsUser } from "../logsusers/logsUser.js";
import { modalAlert } from "../modals/modals.js";


document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let nome = document.getElementById('cad-name')
    let email =document.getElementById('cad-email')
    let senha = document.getElementById('cad-password')

    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    // let index = usersadm.length
    // if( nome.value == '' || email.value == '' || senha.value == ''){
    //     modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`);
    //     return false
    // }
    // if(!validaNome(nome.value)){
    //     modalAlert(`<p><strong>Nome Invalido.</strong></p>`);
    //     return false
    // } 
    
    // if(!validaEmail(email.value)){
    //     modalAlert(`<p><strong>Email Inválido.</strong></p>`);
    //     return false
    // }

    let useradm = {
        Name: nome.value,
        Email: email.value,
        Password: senha.value,
        
    }
    
    criaRegistro(useradm);
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
        if(!response.ok){
            const errorResponseData= await response.json().catch(()=>({}));
                        
            var message = "Erro desconhecido.";
            
            if(errorResponseData.message){
                message = errorResponseData.message;                
            }
            if(errorResponseData.errors){
                message = errorResponseData.errors[0];
            }
            ValidationError(message);
            modalAlert(`<p><strong>${message}</strong></p>`);
            throw new Error(message);
        }
        window.location.href="/login/login.html"

    }
    catch (error) {
        console.error(error);
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

function ValidationError(error){
    if(error.includes("nome")){
        let name = document.getElementById('cad-name')
        StyleErro(name, error)
    }
    if(error.toLowerCase().includes("email")){
        let email = document.getElementById('cad-email')
        StyleErro(email, error)
    }
    if(error.toLowerCase().includes("senha")){
        let password = document.getElementById('cad-password')
        StyleErro(password, error)
    }
}
function StyleErro(field, error){
    
    let errors = document.querySelectorAll('.style-error')
    errors.forEach(error => {
        error.remove();
    });
    let fields = document.querySelectorAll('.input-campo')
    fields.forEach(field => {
        field.style.marginBottom='';
    });
    field.style.marginBottom='0'
    let errorp = document.createElement('p')
    errorp.className=('style-error');
    errorp.innerHTML=error;
    field.insertAdjacentElement('afterend', errorp);
}