
let modal = document.createElement('dialog')
modal.className='modal-class'

export function modalAlert(mensage) {
    let body = document.querySelector('.body')
    let div = document.createElement('div')
    let text = document.createElement('p')
    text.innerText = mensage

    setTimeout(() => {
        
        div.appendChild(text)
        modal.appendChild(div)
        body.appendChild(modal)

        modal.show()
        
    }, 1000);
    setTimeout(() => {
        
        modal.close()
        modal.removeChild(div)
        body.removeChild(modal)
    }, 8000);
}

