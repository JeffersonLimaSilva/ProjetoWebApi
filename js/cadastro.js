


document.getElementById('button-gravar').addEventListener('click', function(e){
    let nome = document.getElementById('name').value
    let idade = parseInt(document.getElementById('years-old').value)
    let email = document.getElementById('email').value
    let ativo = document.getElementById('ativo').checked
    let ativoInativo = 'Inativo'
    let endereco = document.getElementById('address').value
    let maisinformacoes = document.getElementById('more-info').value
    let interesses = document.getElementById('interesses').value
    let sentimentos = document.getElementById('sentimentos').value
    let valores = document.getElementById('valores').value

    if(nome == '' || email == ''){
        alert("Campo Nome e Email obrigatório")
        return false
    }
    if(idade < 18 || idade > 90){
        alert("Campo Idade irregular")
        return false
    }
    
    if(ativo){
        ativoInativo = "Ativo"
    }

    let user= {
        name: nome, 
        idade: idade, 
        email: email, 
        ativo: ativoInativo, 
        endereco: endereco, 
        maisinformacoes: maisinformacoes, 
        interesses: interesses, 
        sentimentos: sentimentos, 
        valores: valores
    }

    let users= JSON.parse(localStorage.getItem('users')) || []

    if(verificaIgual(users, user.email)){
        alert("Email ja cadastrado")
        return false
    }
    
    
    users.push(user)

    localStorage.setItem('users', JSON.stringify(users))

    document.getElementById('name').value = ''
    document.getElementById('years-old').value = ''
    document.getElementById('email').value = ''
    document.getElementById('ativo').checked= false
    
    

    alert("Usuario cadastrado")
})

function verificaIgual(users, email){
    return users.some(function(user){
        return user.email === email  
    })
}



