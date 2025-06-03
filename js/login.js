document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let senha = document.getElementById('f-password').value
    let users = JSON.parse(localStorage.getItem('users'))

    if(email== '' || senha==''){
        alert("Preencha todos os campos")
        return false
    } 
    if(verificaIgual(users, email)){
        window.location.href = '/index.html';
        return false
    }
    alert("Email não cadastrado")
    
})

function verificaIgual(users, email){
    return users.some(function(user){
        return user.email === email  
    })
}

