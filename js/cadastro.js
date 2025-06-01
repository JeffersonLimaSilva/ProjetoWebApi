document.getElementsByTagName('button').addEventListener('onclick', function(e){
    if(verificaVazio){
        alert("usuario cadastrado")
    }

})

function cadastraUser(){
    // let gravar=document.getElementsByName('button')
    // gravar.addEventListener('click', () => {
        if(verificaVazio){
            alert("usuario cadastrado")
        }
    // })
}

function verificaVazio(){
    let nome = document.getElementById('name').value
    let email = document.getElementById('email').value

    if(nome == '' || email == ''){
        alert("Campo Nome e Email obrigatório")
        return false
    }
    else{
        return true
    }
}
