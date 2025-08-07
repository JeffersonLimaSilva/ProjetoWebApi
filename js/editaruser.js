import { showModal, closeModal } from "./cadNewcad.js";
import { criaLista} from "./lista.js";
import { modalAlert, modalConfirm } from "../modals/modals.js";
let auxC = null;

export function modalEditar(client){

    let modalClass = document.querySelector('.box-list-newcad');
    modalClass.className=('box-list-editar');


    document.getElementById('name').value = client.name;
    document.getElementById('years-old').value = client.age;
    document.getElementById('email').value = client.email;
    if(client.status === 'Inativo'){
        document.getElementById('ativo').checked= false;
    }
    if(client.status === 'Ativo'){
        document.getElementById('ativo').checked= true;
    }
    
    document.getElementById('address').value =client.address;
    document.getElementById('more-info').value =client.moreInfor;
    document.getElementById('interesses').value =client.interests;
    document.getElementById('sentimentos').value =client.emotions;
    document.getElementById('valores').value =client.value;

    let dialogClass = document.querySelector('.dialog-cad');
    dialogClass.className=('dialog-edit');

    let modaltitle = document.querySelector('.modaltitle');
    modaltitle.innerText='Editar Cadastro';
    
    auxC = client;

    showModal();
}

let buttonEditar =document.getElementById('button-editar') || false;
if (buttonEditar) {
    buttonEditar.addEventListener('click', async function(e){
        let client = auxC;
        
        let name = document.getElementById('name').value;
        if(name != client.name){
            client.name = name;
        }
        let age = parseInt(document.getElementById('years-old').value);
        if(age != client.age){
            client.age = age;
        }
        let email = document.getElementById('email').value;
        if(email != client.email){
            client.email = email;
        }
        let status = document.getElementById('ativo').checked;
        if(status){
            let ativoInativo = 'Ativo';
            if (ativoInativo != client.status) {
                client.status = ativoInativo;
            }
        }else{
            let ativoInativo = 'Inativo';
            if (ativoInativo != client.status) {
                client.status = ativoInativo;
            }
        }
        let address = document.getElementById('address').value;
        if(address != client.address){
            client.address = address;
        }
        let moreInfor = document.getElementById('more-info').value;
        if(moreInfor != client.moreInfor){
            client.moreInfor = moreInfor;
        }
        let interests = document.getElementById('interesses').value;
        if(interests != client.interests){
            client.interests = interests;
        }
        let emotions = document.getElementById('sentimentos').value;
        if(emotions != client.emotions){
            client.emotions = emotions;
        }
        let value = document.getElementById('valores').value;
        if(value != client.value){
            client.value = value;
        }
        
        
        let Client= {
            Name: client.name, 
            Email: client.email, 
            Age: String(client.age), 
            Address: client.address, 
            MoreInfor: client.moreInfor, 
            Interests: client.interests, 
            Emotions: client.emotions, 
            Value: client.value,
            Status: client.status,
        }
        try{
            await UpdateClient(client.id, Client);
            modalAlert(`<p>As informações de <strong>${email}</strong> foram salvas.</p>`);
            let dialogClass = document.querySelector('.dialog-edit') || false;
            if (dialogClass) {
                dialogClass.className=('dialog-cad');
            }
            await criaLista();
            let deleteButton = document.querySelector('#button-delete');
            deleteButton.style.display='none';
            closeModal();
        }
        catch (error) {
            console.error(`Erro ao atualizar o Cliente:${error.message}`);
        }
        
    }) 
}
let deleteButton = document.getElementById('button-delete') || false
if (deleteButton) {
    
    deleteButton.addEventListener('click', ()=>{
        let client = auxC;
        modalConfirm(client.id, client.email);
    })
}
async function UpdateClient(id, Client){
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/update`;
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    try {
        const response = await fetch(apiEndpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${userOn.token}`
            },
            body: JSON.stringify(Client)
        });
        if(!response.ok){
            const errorResponseData= await response.json().catch(()=>({}));
            var message = "Erro desconhecido.";
            
            if(errorResponseData.Message){
                message = errorResponseData.Message;
            }
            if(errorResponseData.errors){
                message = errorResponseData.errors[0];
                ValidationError(errorResponseData.errors[0]);  
            }
            modalAlert(`<p><strong>${message}</strong></p>`);
            throw new Error(message);
        }
    }
    catch (error) {
        throw new Error(error);
    }
}

function ValidationError(error){

    if(error.includes("nome")){
        let name = document.getElementById('name')
        StyleErro(name, error)
    }
    if(error.includes("email")){
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
    field.style.marginBottom='0'
    let errorp = document.createElement('p')
    errorp.className=('style-error');
    errorp.innerHTML=error;
    field.insertAdjacentElement('afterend', errorp);
}