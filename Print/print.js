import { setPerPage } from "../js/perPage.js";
import { criaListaLogs } from "../js/listalogs.js";
import { criaLista } from "../js/lista.js";
import { countRegistration } from "../Dashboard/dashboard.js";
import { countLogs } from "../js/listalogs.js";

document.querySelector('.button').addEventListener('click', async function(e){
    
    let users = document.querySelector('#imprimir-users') || false;
    let logs = document.querySelector('#imprimir-logs') || false;
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || [];
;
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    let conteudo = '';
    let title;
    let win = window.open('', '', 'heigth=700,width=700');


    let estilos = '<style>'

    
    if(users){        
        console.log(await countRegistration());
        
        setPerPage(await countRegistration());
        await criaLista();
         
        await new Promise(resolve => setTimeout(resolve, 60));
        
        estilos += '.div-list{display: flex;flex-direction: column;align-items: center;height: 100%;background-color: rgb(255, 255, 255);}'
        estilos += '.table-list{width: 700px;margin-top: 20px;thead{border-radius: 20px;th{ text-align: left;padding: 5px 5px; border-bottom: 1px solid rgb(68, 68, 68)}}tbody{tr{height: 15px;}td{border-bottom: 1px solid rgb(68, 68, 68);padding: 5px 5px;max-height: 15px;}#acao{max-width: 120px;}:nth-child(1){max-width: max-content;}}}'
        estilos += '</style>'
        title= 'Lista de Usuários'
        conteudo = document.querySelector('#imprimir-users').innerHTML || []
    }if(logs){

        setPerPage(await countLogs());
        await criaListaLogs();        
        await new Promise(resolve => setTimeout(resolve, 60));

        estilos += '.div-list{display: flex;flex-direction: column;align-items: center;height: 100%;background-color: rgb(255, 255, 255);}'
        estilos += '.table-list{width: 700px;margin-top: 20px;thead{border-radius: 20px;th{ text-align: left;padding: 5px 5px; border-bottom: 1px solid rgb(68, 68, 68)}}tbody{tr{height: 15px;}td{border-bottom: 1px solid rgb(68, 68, 68); font-size: 1.5vh; padding: 5px 5px;max-height: 15px;}#acao{max-width: 120px;}:nth-child(1){max-width: max-content;}}}'
        estilos += '</style>'
        title= 'Logs do Usuário'
        conteudo = document.querySelector('#imprimir-logs').innerHTML || false
    }


   
    
    win.document.write('<html><head>')
    win.document.write('<title></title>')
    win.document.write(title)
    win.document.write('</title>')
    win.document.write(estilos)
    win.document.write('</head><body>')
    win.document.write('<div class="div-list">')
    win.document.write('<table class="table-list">')
    win.document.write(conteudo)
    win.document.write('</table>')
    win.document.write('</div></body></html>')
    
    
    win.print()
    if(users){
        
        if (!win.closed) {
            setPerPage(9);
            criaLista();
        }
    }
    if(logs){
        if (!win.closed) {
            setPerPage(11)
            criaListaLogs()
        }
    }
    
})