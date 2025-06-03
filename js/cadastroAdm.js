

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let nome = document.getElementById('cad-name').value
    let email =document.getElementById('cad-email').value
    let senha = document.getElementById('cad-password').value

    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    if( nome == '' || email == '' || senha == ''){
        alert("Preencha todos os campos.")
        return false
    }

    if(verificaIgualEmailCad(usersadm, email)){
        alert("Email ja cadastrado.")
        return false
    }
    let useradm = {
        name: nome,
        email: email,
        password: senha
    }
    

    usersadm.push(useradm)

    localStorage.setItem('usersadm', JSON.stringify(usersadm))

    window.location.href='/html/login.html'

})

function verificaIgualEmailCad(usersadm, email){
    return usersadm.some(function(useradm){
        return useradm.email === email  
    })
}