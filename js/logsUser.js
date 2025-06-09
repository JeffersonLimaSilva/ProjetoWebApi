export function criaLogsUser(name, email, acao, alvo, teste){
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || []
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []

    let date = new Date;
    let formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    
    let loguser ={
        data: formattedDate,
        name, name,
        email: email,
        infor: acao + ' ' + alvo
    }
    let lista = []
    lista.push(loguser)
    
    if (teste === 1) {
        logsuser.push(lista)
    }
    
    if(teste === 2){
        logsuser[userOn.index].push(loguser)
        
    }
    console.log("ola");
    localStorage.setItem('logsuser', JSON.stringify(logsuser))

    
}

