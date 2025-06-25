function image(){
    let home = document.querySelector('#home')
    let cadastro = document.querySelector('#cadastro')
    let relatorio = document.querySelector('#relatorio')

    let homeblack = document.querySelector('#home-black')
    let cadastroblack = document.querySelector('#cadastro-black')
    let relatorioblack = document.querySelector('#relatorio-black')
    
    homeblack.className='image-off'
    cadastroblack.className='image-off'
    relatorioblack.className='image-off'

    home.className='image'
    cadastro.className='image'
    relatorio.className='image'
}

image()


