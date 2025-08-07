import { VerifyAcess } from "../js/restricoes.js";
import { modalAlert } from "../modals/modals.js";

document.querySelector('form').addEventListener('submit', async function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let senha = document.getElementById('f-password').value

    if(email== '' || senha==''){
        modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`)
        return false
    } 

    var login = {
        Email: email,
        Password: senha
    }

    try{
        await tryLogin(login);
    }
    catch (error){
        modalAlert(`<p><strong>${error.message}.</strong></p>`)
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
            throw new Error(errorResponseData.message);
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
                email: userData.userEmail
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

