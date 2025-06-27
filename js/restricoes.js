document.addEventListener('DOMContentLoaded', function(){
    let userOn = JSON.parse(localStorage.getItem('userOn'))
    
    

    if(userOn.email == '' && userOn.index == ''){

        window.location.href='/login/login.html'
    }
    
})