document.addEventListener('DOMContentLoaded', ()=>{
    let home = document.querySelector('#home')
    let cadastro = document.querySelector('#cadastro')
    let relatorio = document.querySelector('#relatorio')

    home.className='image'
    cadastro.className='image'
    relatorio.className='image'
})


document.querySelector('.home').addEventListener('mouseover', ()=>{
    let homeblack = document.querySelector('#home-black')
    let home = document.querySelector('#home')
    homeblack.className=''
    home.className='image'

})

document.querySelector('.cadastro').addEventListener('mouseover', ()=>{
    let cadastroblack = document.querySelector('#cadastro-black')
    let cadastro = document.querySelector('#cadastro')
    cadastroblack.className=''
    cadastro.className='image'

})

document.querySelector('.relatorio').addEventListener('mouseover', ()=>{
    let relatorioblack = document.querySelector('#relatorio-black')
    let relatorio = document.querySelector('#relatorio')
    relatorioblack.className=''
    relatorio.className='image'

})

