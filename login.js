document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()

    var email = document.getElementById('f-email').value 
    var senha = document.getElementById('f-password').value

    if(email== '' || senha==''){
        alert("Preencha todos os campos")
        return false
    } 
    
    window.location.href = '/index.html';
})

