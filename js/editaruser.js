function editarUser(user, campo, conteudo){
    let users = JSON.parse(localStorage.getItem('users')) || []
    user[campo] = conteudo
    localStorage.setItem('users', JSON.stringify(users))
}