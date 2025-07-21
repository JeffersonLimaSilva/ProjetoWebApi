import { criaLogsUser } from "../logsusers/logsUser.js";
import { modalAlert } from "../modals/modals.js";

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let senha = document.getElementById('f-password').value

    

    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    let userOn = JSON.parse(localStorage.getItem('userON')) || []

    let nome

    if(email== '' || senha==''){
        modalAlert(`<p><strong>É necessário preencher todos os campos.</strong></p>`)
        return false
    } 

    var login = {
        Email: email,
        Password: senha
    }
    console.log(login);
    

    tetarLogar(login)
    
    // if(verificaIgualEmailLogin(usersadm, email)){
    //     if(verificaIgualSenhaLogin(usersadm, senha)){
    //         userOn={
    //             email: email,
    //             index: userOnIndex(usersadm, email)
    //         }

            
    //         localStorage.setItem('userOn', JSON.stringify(userOn))

    //         nome= usersadm[userOnIndex(usersadm, email)].name

    //         criaLogsUser(nome, email, 'logou-se', '', 2)

    //         window.location.href = '/index.html';
    //         return false
    //     }
        
    //     modalAlert(`<p><strong>Senha Incorreta.</strong></p>`)
    //     return false
    // }
    // modalAlert(`<p><strong>Email não cadastrado.</strong></p>`)
})
async function tetarLogar(login){
    const apiEndpoint = 'https://localhost:7114/login/check';
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(login)
        });
        const token = await response.json();
        const loginData= {
            token: token.token
        }

        localStorage.setItem('userOn', JSON.stringify(loginData));
        changeHome();
    }
    catch (error) {
        console.error('Erro ao enviar produto para a API:', error);
        modalAlert($`<p><strong>Erro:${error}.</strong></p>`)
        throw error; 
    }
}
async function changeHome() {
    let userOn = JSON.parse(localStorage.getItem('userOn'))
    if(!userOn){
        return;
    }
    const verifyEndpoint = "https://localhost:7114/api/Auth/verify"
    try{
        const response = await fetch(verifyEndpoint,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userOn.token}`
            }
        });
        if (response.ok) {
            const userData = await response.json();
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
    catch{

    }
}
function userOnIndex(usersadm, email){
    
    let index
    usersadm.forEach(function(useradm){
        if(useradm.email == email){
            index = useradm.index
        }
        
        
    })
    return index
}

