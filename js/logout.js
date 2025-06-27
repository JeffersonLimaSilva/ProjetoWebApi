import { criaLogsUser } from "../logsusers/logsUser.js";
let logout = document.querySelectorAll('.logout')
logout.forEach(logout => {
    
    logout.addEventListener('click', function(e){
        let userOn = JSON.parse(localStorage.getItem('userOn')) || []
        let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
        
        criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'deslogou', '', 2)

        userOn.email = ''
        userOn.index = ''
        localStorage.setItem('userOn', JSON.stringify(userOn))
        
        window.location.href='/html/login.html' 
    })
});


document.addEventListener('DOMContentLoaded', function(e){
    let button = document.querySelector('.logout')

    button.addEventListener('mouseover', function(e){
        button.style.backgroundColor = 'rgb(245, 35, 35)'
        button.style.z = 'white'
    })
    button.addEventListener('mouseout', function(e){
        button.style.backgroundColor =''
        button.style.color = ''
    })
})