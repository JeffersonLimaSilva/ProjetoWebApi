import { VerifyAcess } from "../js/restricoes.js";
import { modalAlert } from "../modals/modals.js";

document.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let password = document.getElementById('f-password').value

    if (!LoginValidation.EmailValidation(email.value)) {
        return false
    }
    if (!LoginValidation.PasswordValidation(password.value)) {
        return false
    }

    var login = {
        Email: email,
        Password: password
    }

    try{
        await tryLogin(login);
    }
    catch (error){
        modalAlert(`<p><strong>${error.message}</strong></p>`)
        console.error('Erro ao Logar:', error.message);
    }
})
async function tryLogin(login){
    const apiEndpoint = 'https://localhost:7114/api/Auth/login/check';
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(login)
        });
        
        if(!response.ok){
            const errorResponseData = await response.json().catch(()=>({}));
            var message = "Erro desconhecido.";
            
            if(errorResponseData.message){
                message = errorResponseData.message;                
            }
            if(errorResponseData.errors){
                ValidationError(errorResponseData.errors[0]);
                console.log(errorResponseData.errors[0]);
                
            }
            ValidationError(message);
            throw new Error(message);
            
        }
        const token = await response.json();
       
        localStorage.setItem('userOn', JSON.stringify(token));

        if(await VerifyAcess()){
            let userOn = JSON.parse(localStorage.getItem('userOn'))
            const userData = await VerifyAcess();
            var user={
                token: userOn.token,
                id: userData.userId,
                name: userData.userName,
                email: userData.userEmail,
                page: 1
            }
            localStorage.setItem('userOn', JSON.stringify(user));
            window.location.href = '/index.html';
        }
    }
    catch (error) {
        if(error.message != "Failed to fetch"){
            throw error;
        }
        throw new Error("Erro de rede.Tente novamente mais tarde."); 
    }
}

function ValidationError(error){
    
    if(error.toLowerCase().includes("email")){
        let email = document.getElementById('f-email');
        StyleErro(email, error);
    }
    if(error.toLowerCase().includes("senha")){
        let password = document.getElementById('f-password');
        StyleErro(password, error);
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
const LoginValidation =
{
    EmailValidation(email)
        {
            if(email== ''){
                modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`)
                ValidationError("É necessário preencher o campo de email.");
                return false
            }
            return true;
        },
    PasswordValidation(password)
    {
        if(password ==''){
            modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`)
            ValidationError("É necessário preencher o campo de senha.");
            return false
        }
        return true;
    }
}