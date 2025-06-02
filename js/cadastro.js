


document.getElementById('button-gravar').addEventListener('click', function(e){
    let nome = document.getElementById('name').value
    let email = document.getElementById('email').value

    if(nome == '' || email == ''){
        alert("Campo Nome e Email obrigatório")
        return false
    }

    let user= {name: nome, email: email}

    let users= JSON.parse(localStorage.getItem('users')) || []

    users.push(user)

    localStorage.setItem('users', JSON.stringify(users))

})






