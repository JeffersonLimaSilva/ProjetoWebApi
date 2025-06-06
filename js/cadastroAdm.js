

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let nome = document.getElementById('cad-name').value
    let email =document.getElementById('cad-email').value
    let senha = document.getElementById('cad-password').value

    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    let index = usersadm.length
    if( nome == '' || email == '' || senha == ''){
        alert("Preencha todos os campos.")
        return false
    }

    if(!validaNome(nome)){
        alert("Nome Invalido")
        return false
    } 
    
    if(!validaEmail(email)){
        alert("Email Inválido.")
        return false
    }

    if(verificaIgualEmailCad(usersadm, email)){
        alert("Email ja cadastrado.")
        return false
    }

    let useradm = {
        name: nome,
        email: email,
        password: senha,
        index: index,
        countclick:0,
        users: [],
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

function validaEmail(email){
    let regex = /^[^\s]+@[^\s]+\.[^\s]+$/
    return regex.test(email)
}

function validaNome(nome){
    let rnome = /^[A-Z][a-z]+[\s][A-Z][a-z]+$/
    return rnome.test(nome)
}