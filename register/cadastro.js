import { criaLista } from "../js/lista.js";
import { modalAlert } from "../modals/modals.js";
import { setPerPage } from "../js/perPage.js";
import { closeModal } from "../js/cadNewcad.js";
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
    
    if(ativo){
        ativoInativo = "Ativo"
    }

    // if(!validaNome(nome)){
    //     modalAlert(`<p><strong>Nome Invalido.</strong></p>`);
    //     return false
    // }

    let date = new Date;

    let mes = (date.getMonth() + 1)

    let Client= {
        Name: nome, 
        Email: email, 
        Age: String(idade), 
        Address: endereco, 
        MoreInfor: maisinformacoes, 
        Interests: interesses, 
        Emotions: sentimentos, 
        Value: valores,
        status: ativoInativo,
    }
    try{
        await CreateClient(userOn.id, Client);
        await criaLista();
        closeModal();
    }
    catch (error) {
        console.error(`Erro ao cadastrar um Cliente:${error}`);
    }
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
            const errorResponseData= await response.json().catch(()=>({}));
            
            var message = "Erro desconhecido.";
            
            if(errorResponseData.message){
                message = errorResponseData.message;                
            }
            if(errorResponseData.errors){
                message = errorResponseData.errors[0];
            }
            ValidationError(message);
            modalAlert(`<p><strong>${message}</strong></p>`);
            throw new Error(message);
        }
        modalAlert(`<p>O usuário <strong>${Client.Email}</strong> foi adicionado.</p>`);

    }
    catch (error) {
        throw new Error(error);

    }
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
function ValidationError(error){

    if(error.includes("nome")){
        let name = document.getElementById('name')
        StyleErro(name, error)
    }
    if(error.toLowerCase().includes("email")){
        let email = document.getElementById('email')
        StyleErro(email, error)
    }
    if(error.includes("idade")){
        let age = document.getElementById('years-old')
        StyleErro(age, error)
    }
    if(error.includes("endereço")){
        let address = document.getElementById('address')
        StyleErro(address, error)
    }
    if(error.includes("Mais Informações")){
        let moreInfor = document.getElementById('more-info')
        StyleErro(moreInfor, error)
    }
    if(error.includes("Interesses")){
        let interests = document.getElementById('interesses')
        StyleErro(interests, error)
    }
    if(error.includes("Sentimentos")){        
        let emotions = document.getElementById('sentimentos')
        StyleErro(emotions, error)
    }if(error.includes("Valores")){
        let values = document.getElementById('valores')
        StyleErro(values, error)
    }
}
function StyleErro(field, error){
    let errors = document.querySelectorAll('.style-error')
    errors.forEach(error => {
        error.remove();
    });
    let fields = document.querySelectorAll('.field-cad')
    fields.forEach(field => {
        field.style.marginBottom='';
    });
    field.style.marginBottom='0.1vh'
    let errorp = document.createElement('p')
    errorp.className=('style-error');
    errorp.innerHTML=error;
    field.insertAdjacentElement('afterend', errorp);
}

cadColor()