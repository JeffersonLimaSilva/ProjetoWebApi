import { criaLogsUser } from "../logsusers/logsUser.js";
import { mudaTema } from "../js/mudatema.js";

let countclick = 0


document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    let email = document.getElementById('f-email').value 
    let senha = document.getElementById('f-password').value
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []

    let userOn = JSON.parse(localStorage.getItem('userON')) || []

    let nome

    if(email== '' || senha==''){
        alert("Preencha todos os campos.")
        return false
    } 
    if(verificaIgualEmailLogin(usersadm, email)){
        if(verificaIgualSenhaLogin(usersadm, senha)){
            userOn={
                email: email,
                index: userOnIndex(usersadm, email)
            }
            
            
            
            localStorage.setItem('userOn', JSON.stringify(userOn))

            nome= usersadm[userOnIndex(usersadm, email)].name

            criaLogsUser(nome, email, 'logou-se', '', 2)

            window.location.href = '/index.html';
            return false
        }
        
        alert("Senha Incorreta.")
        return false
    }
    alert("Email não cadastrado.")
    
})

function verificaIgualEmailLogin(usersadm, email){
    return usersadm.some(function(useradm){
        return useradm.email === email  
    })
}
function verificaIgualSenhaLogin(usersadm, senha){
    return usersadm.some(function(useradm){
        return useradm.password === senha
    })
}

function userOnIndex(usersadm, email){
    
    let index
    usersadm.forEach(function(useradm){
        if(useradm.email == email){
            index = useradm.index
        }
        
        
    })
    return index
}

document.addEventListener('DOMContentLoaded', function(){

   let moon =document.getElementById('logcad-moon-theme')
   moon.className='show'
   
   document.getElementById('logcad-moon-theme').addEventListener('click', ()=>{
      
      if (countclick < 2) {
        countclick ++
      }
      mudaTema(countclick)
      
   })
   document.getElementById('logcad-sun-theme').addEventListener('click', ()=>{
      if (countclick < 2) {
        countclick ++
      }
      mudaTema(countclick)
      
   })
   mudaTema(countclick)

})