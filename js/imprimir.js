document.getElementById('button-imprimir').addEventListener('click', function(e){

    alert("clicou")
    
    let conteudo= document.getElementById('id-imprimir').innerHTML

    let win = window.open('', '', 'heigth=700,width=700')

    win.document.write('<html><head>')
    win.document.write('<title>Lista Usuarios</title>')
    win.document.write('</head><body>')
    win.document.write(conteudo)
    win.document.write('</body></html>')

    win.print()
    console.log("conteudo",conteudo);
    
})