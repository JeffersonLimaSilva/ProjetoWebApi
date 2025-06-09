function criaListaLogs( search =''){

    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    let logsuser = JSON.parse(localStorage.getItem('logsuser')) || []

    let tbody = document.getElementById('tbody-logs')
    tbody.innerHTML=''
    
    
    logsuser[userOn.index].forEach(lista => {

        let minName = lista.name.toLowerCase()
        let minEmail = lista.email.toLowerCase()
        let minInfor = lista.infor.toLowerCase()

        if(lista.data.includes(search) || minName.includes(search) || minEmail.includes(search) || minInfor.includes(search)){
            
            let trbody = document.createElement('tr')
            let tddate = document.createElement('td')
            let tdname = document.createElement('td')
            let tdemail = document.createElement('td')
            let tdaction = document.createElement('td')

            tddate.textContent =   lista.data
            tdname.textContent =   lista.name
            tdemail.textContent =  lista.email
            tdaction.textContent = lista.infor

            trbody.appendChild(tddate)
            trbody.appendChild(tdname)
            trbody.appendChild(tdemail)
            trbody.appendChild(tdaction)

            tbody.appendChild(trbody)
        }
        
    });


}
document.getElementById('search').addEventListener('input', function(e){
    let minSearch = this.value.toLowerCase()
    criaListaLogs(minSearch)
    
})
criaListaLogs()