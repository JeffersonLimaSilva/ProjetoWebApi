import { criaLista } from "../js/lista.js";
import { modalAlert } from "../modals/modals.js";
import { setPerPage } from "../js/perPage.js";

setPerPage(11);
criaLista();


document.getElementById('button-gravar').addEventListener('click', async function(e){
    let modalcad = document.getElementById('modal-form')
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
    
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

    if(nome == '' || email == ''){
        modalAlert(`<p><strong>Campo Nome e Email obrigatório.</strong></p>`);
        return false
    }
    if(!idade){
        modalAlert(`<p><strong>Campo Idade obrigatório.</strong></p>`);
        return false
    }
    if(idade < 18 || idade > 90){
        modalAlert(`<p><strong>Campo Idade irregular.</strong></p>`);
        return false
    }
    
    if(ativo){
        ativoInativo = "Ativo"
    }

    if(!validaNome(nome)){
        modalAlert(`<p><strong>Nome Invalido.</strong></p>`);
        return false
    }

    if(!validaEmail(email)){
        modalAlert(`<p><strong>Email Inválido.</strong></p>`);
        return false
    }

    // if(verificaIgual(usersadm[userOn.index], email)){
    //     modalAlert(`<p><strong>Email já cadastrado.</strong></p>`);
    //     return false
    // }

    let date = new Date;

    let mes = (date.getMonth() + 1)

    let Client= {
        Name: nome, 
        Email: email, 
        Age: idade, 
        Address: endereco, 
        MoreInfor: maisinformacoes, 
        Interests: interesses, 
        Emotions: sentimentos, 
        Value: valores,
        status: ativoInativo,
    }
    await CreateClient(userOn.id, Client)
    // criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, 'cadastrou', email, 2)

    document.getElementById('name').value = ''
    document.getElementById('years-old').value = ''
    document.getElementById('email').value = ''
    document.getElementById('ativo').checked= true
    document.getElementById('address').value =''
    document.getElementById('more-info').value =''
    document.getElementById('interesses').value =''
    document.getElementById('sentimentos').value =''
    document.getElementById('valores').value =''
    
    
    
    
    await criaLista();
    modalcad.close()

    let body = document.querySelector('.body')
    let overlayer = document.querySelector('.overlayer')
    body.removeChild(overlayer)
})

async function CreateClient(id, Client){
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/add`;
    
    
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(Client)
        });
        if(!response.ok){
            var errodata= response.json().catch(()=>{});
            console.log(response.statusText);
            
            throw Error(errodata.error);
        }
        modalAlert(`<p>O usuário <strong>${Client.Email}</strong> foi adicionado.</p>`);

    }
    catch (error) {
        console.error(`Erro ao cadastrar um Cliente:${error}`);
    }
}

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