


document.getElementById('button-gravar').addEventListener('click', function(e){
    let nome = document.getElementById('name').value
    let email = document.getElementById('email').value
    

    if(nome == '' || email == ''){
        alert("Campo Nome e Email obrigatório")
        return false
    }

    let user= {name: nome, email: email}

    let users= JSON.parse(localStorage.getItem('users')) || []

    if(verificaIgual(users, user.email)){
        alert("Campo Email ja existe")
        return false
    }
    
    
    users.push(user)

    localStorage.setItem('users', JSON.stringify(users))

    document.getElementById('name').value = ''
    document.getElementById('email').value = ''

    alert("Usuario cadastrado")

    
})

function verificaIgual(users, email){
    return users.some(function(user){
        return user.email === email  
    })
}



