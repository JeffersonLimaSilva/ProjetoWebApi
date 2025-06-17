let buttonNewCad = document.querySelector('#button-newCad') || false

if(buttonNewCad){
    buttonNewCad.addEventListener('click', function(e){
        let modaltitle = document.querySelector('.modaltitle')
        modaltitle.innerText='Novo Cadastro'
        showModal()
    })
}

let buttonFechaModal = document.querySelector('#fecha-modal') || false

if (buttonFechaModal){
    buttonFechaModal.addEventListener('click', function(){
        closeModal()
    })
}



export function showModal(){
    let modalad = document.getElementById('modal')

    let body = document.querySelector('.body')
    let overlayer = document.createElement('div')
    overlayer.className=('overlayer')
    overlayer.style.width='100%'
    overlayer.style.height='100%'
    overlayer.style.backgroundColor='rgba(0, 0, 0, 0.5)'
    overlayer.style.position='absolute'
    overlayer.style.zIndex='900'
    body.appendChild(overlayer)

    modalad.show()
}

export function closeModal(){
    let modalad = document.getElementById('modal')

    let body = document.querySelector('.body')
    let overlayer = document.querySelector('.overlayer')
    body.removeChild(overlayer)
    let modalClass = document.querySelector('.box-list-editar') || false
    if(modalClass){
        modalClass.className=('box-list-newcad')
    }

    document.getElementById('name').value = ''
    document.getElementById('years-old').value = ''
    document.getElementById('email').value = ''
    document.getElementById('ativo').checked= false
    document.getElementById('address').value =''
    document.getElementById('more-info').value =''
    document.getElementById('interesses').value =''
    document.getElementById('sentimentos').value =''
    document.getElementById('valores').value =''

    
    modalad.close()
}