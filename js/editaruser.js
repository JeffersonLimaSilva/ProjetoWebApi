import { showModal } from "./cadNewcad.js";
import { criaLista, showCadPend} from "./lista.js";
import { criaLogsUser } from "../logsusers/logsUser.js";
import { modalAlert, modalConfirm } from "../modals/modals.js";



let auxC = null;


export function modalEditar(client){
    console.log(client);
    

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
        
        let modalcad = document.getElementById('modal-form');

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
        let modalClass = document.querySelector('.box-list-editar') || false;
        if(modalClass){
            modalClass.className=('box-list-newcad');
        }
        let dialogClass = document.querySelector('.dialog-edit') || false;
        if (dialogClass) {
            dialogClass.className=('dialog-cad');
        }
        let Client= {
            Name: client.name, 
            Email: client.email, 
            Age: client.age, 
            Address: client.address, 
            MoreInfor: client.moreInfor, 
            Interests: client.interests, 
            Emotions: client.emotions, 
            Value: client.value,
            Status: client.status,
        }
        console.log(client);
        await UpdateClient(client.id, Client);
        modalAlert(`<p>As informações de <strong>${email}</strong> foram salvas.</p>`);

        await criaLista();
        modalcad.close();

        let deleteButton = document.querySelector('#button-delete');
        deleteButton.style.display='none';

        let body = document.querySelector('.body');
        let overlayer = document.querySelector('.overlayer');
        body.removeChild(overlayer);
        
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
            var errodata= response.json().catch(()=>{});
            console.log(response.statusText);
            
            throw Error(errodata.error);
        }
    }
    catch (error) {
        console.error(`Erro ao atualizar o Cliente:${error}`);
    }
}

function editarUser(index, campo, conteudo){
    
    let userOn =JSON.parse(localStorage.getItem('userOn')) || []
    let usersadm = JSON.parse(localStorage.getItem('usersadm')) || []
    usersadm[userOn.index].users.reverse()
    usersadm[userOn.index].users[index][campo] = conteudo
    
    criaLogsUser(usersadm[userOn.index].name, usersadm[userOn.index].email, `editou o(a) ${campo} de`, usersadm[userOn.index].users[index].email, 2)

    usersadm[userOn.index].users.reverse()
    localStorage.setItem('usersadm', JSON.stringify(usersadm))
    showCadPend()
    criaLista()
}


