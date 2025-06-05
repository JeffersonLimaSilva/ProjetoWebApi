


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

    let usersadm= JSON.parse(localStorage.getItem('usersadm')) || []

    let userOnEmail = JSON.parse(localStorage.getItem('userOn')).email || []
    let index
    usersadm.forEach(function(useradm){
        if(useradm.email == userOnEmail){
            index = useradm.index
        }

    })
    


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

    if(!validaNome(nome)){
        alert("Nome Invalido")
        return false
    }

    if(!validaEmail(email)){
        alert("Email Inválido.")
        return false
    }

    if(verificaIgual(usersadm[index], email)){
        alert("Email ja cadastrado")
        return false
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
    
    
    usersadm[index].users.push(user)

    localStorage.setItem('usersadm', JSON.stringify(usersadm))

    document.getElementById('name').value = ''
    document.getElementById('years-old').value = ''
    document.getElementById('email').value = ''
    document.getElementById('ativo').checked= false
    document.getElementById('address').value =''
    document.getElementById('more-info').value =''
    document.getElementById('interesses').value =''
    document.getElementById('sentimentos').value =''
    document.getElementById('valores').value =''
    

    alert("Usuario cadastrado")
})

function verificaIgual(usersadm, email){
    return usersadm.users.some(function(user){
        return user.email === email  
    })
}

function validaEmail(email){

    let remail = /^[^\s]+@[^\s]+\.[^\s]+$/
    return remail.test(email)
}

function validaNome(nome){
    let rnome = /^[A-Z][a-z]+[\s][A-Z][a-z]+$/
    return rnome.test(nome)
}

