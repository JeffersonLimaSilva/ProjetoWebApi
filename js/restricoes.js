import { Logout } from "../js/logout.js";
export async function VerifyAcess() {
    let userOn = JSON.parse(localStorage.getItem('userOn'))
    if(userOn.token == ''){
        return;
    }
    if(!userOn){
        return;
    }
    const verifyEndpoint = "https://localhost:7114/api/Auth/verify"
    try{
        const response = await fetch(verifyEndpoint,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userOn.token}`
            }
        });
        if (response.ok) {
            const userData = await response.json();
            return userData;
        }
        if(response.status === 401){
            await Logout(userOn.id);
        }
    }
    catch(error){
         userOn ={
            token: '',
            id: '',
            name: '',
            email: ''
        }
        localStorage.setItem('userOn', JSON.stringify(userOn))
        window.location.href='/login/login.html'
        console.error(error);
    }
}
await VerifyAcess();