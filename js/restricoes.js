 function restriction(){
    let userOn = JSON.parse(localStorage.getItem('userOn')) || false;
    
    if(!userOn){
        token = {
            token: ''
        }
        localStorage.setItem('userOn', JSON.stringify(token));
        window.location.href='/login/login.html';
        return;
    }

    if(userOn.token == ''){

        window.location.href='/login/login.html'
    }
    
}
restriction()