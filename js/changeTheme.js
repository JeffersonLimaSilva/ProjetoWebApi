let userOn=JSON.parse(localStorage.getItem('userOn')) || [];
async function checkTheme(){
    let theme = JSON.parse(localStorage.getItem('theme'));
    if(!userOn.id){
        changeTheme(theme);
    }
    else{
        var admin = await getAdmin();
        theme = admin.theme
        localStorage.setItem('theme', JSON.stringify(theme));
        changeTheme(theme);
    }
    document.getElementById('change-theme').checked = theme;
}
document.querySelector('#change-theme').addEventListener('change', async ()=>{
   let theme = document.querySelector('#change-theme').checked;
   
   if (userOn.id != '') {
        var admin = await getAdmin();
        admin.theme = theme;
        await UpdateAdmin(admin);
   }
   localStorage.setItem('theme', JSON.stringify(theme));
   changeTheme(theme);
});

async function getAdmin(){
    const apiEndpoint = `https://localhost:7114/api/Admin/${userOn.id}/get-admin`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'GET',
            headers: {
                "ContentType" : "application/json"
            }
        });
        var data = response.json();
        return data;
    }
    catch{
        throw error;
    }
}
async function UpdateAdmin(admin){
    var adminUpdate = {
        Name : admin.name,
        Email : admin.email,
        Password : admin.password,
        Theme : admin.theme,
    }
    await Update(adminUpdate);
}
async function Update(adminUpdate){
    const apiEndpoint = `https://localhost:7114/api/Admin/${userOn.id}/update`;
    try{
        const response = await fetch(apiEndpoint,{
            method: 'PUT',
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(adminUpdate)
        });
    }
    catch{
        throw error;
    }
}

export function changeTheme(booleantheme){

   let bodyLogin = document.querySelector('#body-login') || false;
   let bodyRegistration = document.querySelector('#body-registration') || false;
   let bodyTheme = document.querySelector('#body-theme');
   if(booleantheme){
      if(bodyLogin){
         bodyLogin.classList.add('theme-black');
      }
      if(bodyRegistration){
         bodyRegistration.classList.add('theme-black');
      }
      if(bodyTheme){
         bodyTheme.classList.add('theme-black');
      }
   }
   else{
      if(bodyLogin){
         bodyLogin.className='body';
      }
      if(bodyRegistration){
         bodyRegistration.className='body';
      }
      if(bodyTheme){
         bodyTheme.className='body';
      }
   }
}
checkTheme()
