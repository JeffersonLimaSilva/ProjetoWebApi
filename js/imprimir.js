document.getElementById('button-imprimir').addEventListener('click', function(e){
    
    let conteudo= document.getElementById('id-imprimir').innerHTML
    
    let win = window.open('', '', 'heigth=700,width=700')

    let estilos = '<style>'
    estilos += '.div-list{display: flex;flex-direction: column;align-items: center;height: 100%;background-color: rgb(255, 255, 255);p{margin: 20px 0px 0px 0px;}#div-p{width: 990px;p{font-weight: 600;}}.div-cabecalho{display: flex;justify-content: space-between;padding: 0px 0px 0px 5px;margin-bottom: 10px; >*{width: 316px;height: 10px;font-size: 15px;}:nth-child(3){text-align: end;margin-right: 15px;}}hr{width: 970px;margin-top: 1px;margin-bottom: 1px;}}'
    estilos += '.div-cabecalho{display: flex;justify-content: space-between;padding: 0px 0px 0px 5px;margin-bottom: 10px;>*{width: 316px;height: 10px;font-size: 15px;}:nth-child(3){text-align: end;margin-right: 15px;}}'
    estilos += '.list-div{display: flex;flex-direction: column;justify-content: space-between;padding: 0px 10px 0px 15px;}'
    estilos += '.list-line{width: 995px; height: 0.1px;}'
    estilos += '.box-list{height: 25px; align-items: center; padding: 0px 5px;display: flex;margin-top: 5px;span{width: 316px; font-size: 15px;}}'
    estilos += '</style>'
    win.document.write('<html><head>')
    win.document.write('<title>Lista Usuarios</title>')
    win.document.write(estilos)
    win.document.write('</head><body>')
    win.document.write('<div class="div-list">')
    win.document.write(conteudo)
    win.document.write('</div></body></html>')

    win.print()
    
    
})