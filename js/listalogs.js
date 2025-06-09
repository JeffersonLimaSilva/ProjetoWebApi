function criaListaLogs( search =''){

    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || []

    
    

    logsuser[userOn.index].forEach(lista => {

        console.log(lista);

        let tbody = document.getElementById('tbody-logs')

        let trbody = document.createElement('tr')
        let tddate = document.createElement('td')
        let tdname = document.createElement('td')
        let tdemail = document.createElement('td')
        let tdaction = document.createElement('td')

        tddate.textContent = lista.data
        tdname.textContent = lista.name
        tdemail.textContent = lista.email
        tdaction.textContent = lista.infor

        trbody.appendChild(tddate)
        trbody.appendChild(tdname)
        trbody.appendChild(tdemail)
        trbody.appendChild(tdaction)

        tbody.appendChild(trbody)

    
        
        
    });


}

criaListaLogs()