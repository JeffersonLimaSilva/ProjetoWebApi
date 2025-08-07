let buttonNewCad = document.querySelector('#button-newCad') || false

if(buttonNewCad){
    buttonNewCad.addEventListener('click', function(e){
        let modaltitle = document.querySelector('.modaltitle')
        modaltitle.innerText='Novo Cadastro'
        showModal()
    })
}

let buttonFechaModal = document.querySelector('#close-modal') || false

if (buttonFechaModal){
    buttonFechaModal.addEventListener('click', function(){
        let dialogClass = document.querySelector('.dialog-edit') || false
        if (dialogClass) {
            dialogClass.className=('dialog-cad')
        }
        let listEdit = document.querySelectorAll('.box-list-editar') || false
        if (listEdit) {
            let deleteButton = document.querySelector('#button-delete')
            deleteButton.style.display='none';
        }
        closeModal()
    })
}
export function showModal(){
    let modalad = document.getElementById('modal-form')

    let body = document.querySelector('.body');
    let overlayer = document.createElement('div');
    overlayer.className='overlayer';
    overlayer.addEventListener('click', ()=>{
        let dialogClass = document.querySelector('.dialog-edit') || false;
        if (dialogClass) {
            dialogClass.className=('dialog-cad');
        }
        closeModal();
    })
    body.appendChild(overlayer);
    
    modalad.show();
    let nome = document.getElementById('name')
    nome.focus()
}

export function closeModal(){
    let modalcad = document.getElementById('modal-form');

    let body = document.querySelector('.body');
    let overlayer = document.querySelector('.overlayer');
    body.removeChild(overlayer);
    let modalClass = document.querySelector('.box-list-editar') || false;
    if(modalClass){
        modalClass.className=('box-list-newcad');
    }

    document.getElementById('name').value = '';
    document.getElementById('years-old').value = '';
    document.getElementById('email').value = '';
    document.getElementById('ativo').checked= true;
    document.getElementById('address').value ='';
    document.getElementById('more-info').value ='';
    document.getElementById('interesses').value ='';
    document.getElementById('sentimentos').value ='';
    document.getElementById('valores').value ='';

    
    modalcad.close();
    let errors = document.querySelectorAll('.style-error')
    errors.forEach(error => {
        error.remove();
    });
    let fields = document.querySelectorAll('.field-cad')
    fields.forEach(field => {
        field.style.marginBottom='';
    });
}