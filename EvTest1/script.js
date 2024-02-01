function checkNull(area,message){
    if(area.value ==''){
    // console.log(mailArea.value)

        let error = document.createElement('div');
        error.textContent = message;
        error.classList = 'errorMessage';
        area.insertAdjacentElement('afterend',error);
        return 1
    }
    else return 0
}

function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function getDataAndVarify(){
    var dataLogIn = []
    for (var i = 1; i <= localStorage.length; i++) {
        var data = JSON.parse(localStorage.getItem('user_' + i));
        dataLogIn.push(data);
    }
    console.log(dataLogIn);
}