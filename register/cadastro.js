import { criaLogsUser } from "../logsusers/logsUser.js";
import { criaLista } from "../js/lista.js";


document.getElementById('button-gravar').addEventListener('click', function(e){
    let modalcad = document.getElementById('modal')
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
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

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

    if(verificaIgual(usersadm[userOn.index], email)){
        alert("Email ja cadastrado")
        return false
    }

    let date = new Date;

    let mes = (date.getMonth() + 1)

    let user= {
        name: nome, 
        yearold: idade, 
        email: email, 
        status: ativoInativo, 
        address: endereco, 
        moreinfo: maisinformacoes, 
        interests: interesses, 
        emotions: sentimentos, 
        values: valores,
        date: mes
    }

    usersadm[userOn.index].users.push(user)
    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    
    criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'cadastrou', email, 2)

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
    
    criaLista()
    modalcad.close()

    let body = document.querySelector('.body')
    let overlayer = document.querySelector('.overlayer')
    body.removeChild(overlayer)
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

function cadColor(){
    let cadcor = document.querySelector('#cadastro-span')

    cadcor.classList='span-on'
}

cadColor()