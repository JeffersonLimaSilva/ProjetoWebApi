

function editarUser(index, campo, conteudo){
    
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    usersadm[userOn.index].users[index][campo] = conteudo
    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    
}
