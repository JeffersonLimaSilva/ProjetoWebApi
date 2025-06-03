function removeUser(index){
    let users= JSON.parse(localStorage.getItem('users')) || []
    users.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(users))
}

