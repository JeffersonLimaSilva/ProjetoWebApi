import { criaLogsUser } from "../logsusers/logsUser.js";
let logout = document.querySelectorAll('.logout')
logout.forEach(logout => {
    
    logout.addEventListener('click', async function(e){
        let userOn = JSON.parse(localStorage.getItem('userOn')) || []
        await Logout(userOn.id);
    })
});

export async function Logout(id){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || []
    const apiEndpoint = `https://localhost:7114/api/Auth/${id}/logout`;
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
        });
        userOn ={
            token: '',
            id: '',
            name: '',
            email: ''
        }
        localStorage.setItem('userOn', JSON.stringify(userOn))
        window.location.href='/login/login.html'
    }
    catch (error) {
        console.error('Erro ao Sair:', error);
        throw error; 
    }
}
document.addEventListener('DOMContentLoaded', function(e){
    let button = document.querySelector('.logout')

    button.addEventListener('mouseover', function(e){
        button.style.backgroundColor = 'rgb(245, 35, 35)'
        button.style.z = 'white'
    })
    button.addEventListener('mouseout', function(e){
        button.style.backgroundColor =''
        button.style.color = ''
    })
})