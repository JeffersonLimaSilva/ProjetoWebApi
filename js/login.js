document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let senha = document.getElementById('f-password').value
    let usersadm = JSON.parse(localStorage.getItem('usersadm'))

    if(email== '' || senha==''){
        alert("Preencha todos os campos.")
        return false
    } 
    if(verificaIgualEmailLogin(usersadm, email)){
        if(verificaIgualSenhaLogin(usersadm, senha)){
            window.location.href = '/index.html';
            return false
        }
        
        alert("Senha Incorreta.")
        return false
    }
    alert("Email não cadastrado.")
    
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

