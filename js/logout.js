import { criaLogsUser } from "./logsUser.js";

document.getElementById('logout').addEventListener('click', function(e){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    console.log(userOn.index);
    console.log(usersadm);
    
    
    
    criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'deslogou', '', 2)

    userOn.email = ''
    userOn.index = ''
    localStorage.setItem('userOn', JSON.stringify(userOn))
    
    window.location.href='/html/login.html' 
})

document.addEventListener('DOMContentLoaded', function(e){
    let button = document.getElementById('logout')

    button.addEventListener('mouseover', function(e){
        button.style.backgroundColor = 'rgb(245, 35, 35)'
        button.style.color = 'white'
    })
    button.addEventListener('mouseout', function(e){
        button.style.backgroundColor =''
        button.style.color = ''
    })
})