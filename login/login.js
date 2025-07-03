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
    if(verificaIgualEmailLogin(usersadm, email)){
        if(verificaIgualSenhaLogin(usersadm, senha)){
            userOn={
                email: email,
                index: userOnIndex(usersadm, email)
            }

            
            localStorage.setItem('userOn', JSON.stringify(userOn))

            nome= usersadm[userOnIndex(usersadm, email)].name

            criaLogsUser(nome, email, 'logou-se', '', 2)

            window.location.href = '/index.html';
            return false
        }
        
        modalAlert(`<p><strong>Senha Incorreta.</strong></p>`)
        return false
    }
    modalAlert(`<p><strong>Email não cadastrado.</strong></p>`)
})

function verificaIgualEmailLogin(usersadm, email){
    return usersadm.some(function(useradm){
        return useradm.email === email  
    })
}
function verificaIgualSenhaLogin(usersadm, senha){
    return usersadm.some(function(useradm){
        return useradm.password === senha
    })
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

