document.getElementById('button-newCad').addEventListener('click', function(e){
    let modalad = document.getElementById('modal-cad')

    modalad.show()
})
document.getElementById('fecha-modal').addEventListener('click', function(){
    let modalad = document.getElementById('modal-cad')
    modalad.close()
})