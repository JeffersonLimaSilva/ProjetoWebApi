


document.addEventListener('DOMContentLoaded', function(){
    let userOn = JSON.parse(localStorage.getItem('userOn'))

   console.log(userOn.email);
   console.log(userOn.index);

    if(userOn.email == '' || userOn.index == ''){

        console.log("entrou no if");
        
    
        // window.location.href='/html/login.html'
    }
})