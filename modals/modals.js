import { criaLista } from "../js/lista.js";
let body = document.querySelector('.body')


export function modalAlert(mensage) {
    verificaModal()
    
    let modal = document.createElement('dialog')
    modal.className='modal-class'
    let div = document.createElement('div')
    let text = document.createElement('span')
    text.innerHTML ='<img class="alert-black" src="../modals/alert.svg"><img class="alert-white" src="../modals/alert-white.svg">' + mensage

    setTimeout(() => {
        
        div.appendChild(text)
        modal.appendChild(div)
        body.appendChild(modal)

        modal.show()
        
    }, 300);
    setTimeout(() => {
        
        modal.close()
        modal.removeChild(div)
        body.removeChild(modal)
    }, 3000);
}

export function modalConfirm(id, email) {
    verificaModal()
    
    let modal = document.createElement('dialog')
    modal.className='modal-class'
    let div1 = document.createElement('div')
    let text = document.createElement('span')
    text.innerHTML = `<img class="alert-black" src="../modals/alertdel.svg"><img class="alert-white" src="../modals/alert-white.svg">Desejas excluir o cadastro de <strong>${email}</strong>?`

    let div2 = document.createElement('div')
    let spanConfirm = document.createElement('span')
    spanConfirm.className='span-confirm'
    spanConfirm.innerText='Corfirmar'
    spanConfirm.addEventListener('click', async()=>{
        await ClientsDeleteApi(id);
        modalAlert(`<p>O usuário <strong>${email}</strong> foi deletado.</p>`);
        body.removeChild(overlayer);
        await criaLista();
    })
    let spanCancel = document.createElement('span')
    spanCancel.className='span-cancel'
    spanCancel.innerText='Cancelar'
    spanCancel.addEventListener('click', ()=>{
        modal.close()
        modal.removeChild(div1)
        body.removeChild(modal)
        body.removeChild(overlayer)
    })

    let overlayer = document.createElement('div')
    overlayer.className='overlayer-modal'
    overlayer.backgroundColor='rgba(0, 0, 0, 0.48)'
    overlayer.addEventListener('click', ()=>{
        modal.close()
        modal.removeChild(div1)
        body.removeChild(modal)
        body.removeChild(overlayer)
    })
    

    div2.appendChild(spanConfirm)
    div2.appendChild(spanCancel)
    div1.appendChild(text)
    div1.appendChild(div2)
    modal.appendChild(div1)
    body.appendChild(overlayer)
    body.appendChild(modal)
    modal.show()
}

function verificaModal() {
    
    let modalcheck = document.querySelector('.modal-class') || false
    if (modalcheck != false) {
        body.removeChild(modalcheck)
    }
}

async function ClientsDeleteApi(id){
    const apiEndpoint = `https://localhost:7114/api/Client/${id}/delete`;
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    try{
        const response = await fetch(apiEndpoint,{
            method: 'DELETE',
            headers :{
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userOn.token}`
            },
            

        });
    }
    catch(error){
        
        throw error;
    } 
}