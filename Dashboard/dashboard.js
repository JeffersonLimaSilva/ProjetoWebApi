async function showCad(){
    let c = document.getElementById('cad') || false
    if (c) {
        c.innerHTML= '';
        c.appendChild(styleValue(0, 'blue'));
        try{
            var value = await countRegistration();
            c.innerHTML= '';
            c.appendChild(styleValue(value, 'blue'));
        }
        catch{
        }
    }
}
async function showCadMes(){
    let c = document.getElementById('cad-mes') || false
    if (c) {
        c.innerHTML=''
        c.appendChild(styleValue(0, 'green'));
        try{
            var value = await countRegistrationMonth();
            c.innerHTML=''
            c.appendChild(styleValue(value, 'green'));
        }
        catch{
            
        }
        
    }
}
async function showCadPend(){
    let c = document.getElementById('cad-pend') || false
    if (c) {
        c.innerHTML='';
        c.appendChild(styleValue(0, 'red'));
        
        try{
            var value = await countRegistrationInactive();
            c.innerHTML='';
            c.appendChild(styleValue(value, 'red'));
        }
        catch{
            
        }
        
    } 
}

function styleValue(x = 0, colorC){
    var valueCad = document.createElement('span')
    valueCad.textContent = x;
    valueCad.style.color = colorC;
    
    valueCad.style.marginTop= '10px'

    return valueCad
}

export async function countRegistration() {
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    const apiEndpoint = `https://localhost:7114/api/Dashboard/${userOn.id}/total-registration`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'
            },
            
        });
        var data = await response.json();
        return data;
    }
    catch(error){
        throw error;
    }
}
async function countRegistrationMonth() {
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    const apiEndpoint = `https://localhost:7114/api/Dashboard/${userOn.id}/registration-month`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'
            },
            
        });
        var data = await response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
}

async function countRegistrationInactive() {
    let userOn = JSON.parse(localStorage.getItem('userOn')) || [];
    const apiEndpoint = `https://localhost:7114/api/Dashboard/${userOn.id}/registration-inactive`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers :{
                'Content-Type' : 'application/json'
            },
            
        });
        var data = await response.json();
        return data;
    }
    catch(error){
        
        throw error;
    }
}

showCad();
showCadMes();
showCadPend();