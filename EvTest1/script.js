function checkNull(area, message) {
    if (area.value == '') {
        // console.log(mailArea.value)

        let error = document.createElement('div');
        error.textContent = message;
        error.classList = 'errorMessage';
        area.insertAdjacentElement('afterend', error);
        return 1
    }
    else return 0
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// function getDataAndVarify() {
//     var dataLogIn = []
//     for (var i = 1; i <= localStorage.length; i++) {
//         var data = JSON.parse(localStorage.getItem('users_' + i));
//         dataLogIn.push(data);
//     }
//     console.log(dataLogIn);
// }

function logIn() {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users'));

    console.log('called');

    for (let i = 0; i < users.length; i++) {
        console.log('loop called');
        // console.log(users[i].password , password)
        if (users[i].mail == mail && users[i].password == password) {
            let userData = mail.split('@')[0];
            window.location.href = 'homePage.html?' + 'u=' + userData;
        }
        else if (users[i].mail == mail && users[i].password != password) {
            document.getElementById('pass-error').classList += ' d-block';
            return false;
        }
    }
    document.getElementById('mail-error').classList += ' d-block';


}



function addUser(userData) {
    // let name = document.getElementById('email').value;
    // let mail = document.getElementById('email').value;
    // let password = document.getElementById('password').value;
    // let Repassword = document.getElementById('re-password').value;
    let mailerror = document.getElementById('mail-error');
    let passerror = document.getElementById('pass-error');
    let nameerror = document.getElementById('name-error');
    let existerror = document.getElementById('mailExist-error');

    mailerror.classList.remove('d-block');
    if(existerror) existerror.remove();
    passerror.classList.remove('d-block');
    nameerror.classList.remove('d-block');
    // mailExist - error.classList.remove('d-block');

    function checkError() {
        if (userData.mail == '') {
            mailerror.classList += ' d-block';
            return 1;
        }
        if (userData.password == '') {
            passerror.classList += ' d-block';
            return 1;
        }
        if (userData.name == '') {
            nameerror.classList += ' d-block';
            return 1;
        }
        // if (password != Repassword) {
        //     rePassError.classList += ' d-block';
        //     return 1;
        // }
    }
    if (checkError()) return 0;

    let users = JSON.parse(localStorage.getItem('users_')) || [];

    console.log('called');

    for (let i = 0; i < users.length; i++) {
        console.log('loop called');
        // console.log(users[i].password , password)
        if (users[i].mail == userData.mail) {
            let regForm = document.getElementById('addUserForm');
            regForm.insertAdjacentHTML("afterbegin", `
            <div class="userExist" id="mailExist-error">
                Email already exist!!!
            </div>
            `)
            regForm.reset();
            return 0;

        }}
         
            console.log('here reached')
            users.push(userData);
            localStorage.setItem('users_', JSON.stringify(users));

            let trId = JSON.parse(localStorage.getItem('users_')).length;

            console.log(trId);
            resultArea.insertAdjacentHTML('beforeend', `<tr id=${trId}>
            <td>${userData['name']}</td>
            <td>${userData['mail']}</td>
            <td>${userData['password']}</td>
            <td>${userData['DOB']}</td>
            <td>${userData['age']}</td>
            <td>
                <button onclick="editUser('${trId}')">Edit</button>
                <button onclick="deleteUser('${trId}')">Delete</button>
            </td>
        </tr>`);
        
        // Clearing form
        document.getElementById('name').value = '';
        document.getElementById('mail').value = '';
        document.getElementById('password').value = '';
        document.getElementById('DOB').value = '';
    }


function showTable(){
    let userData = JSON.parse(localStorage.getItem('users_'));
    let resultArea = document.getElementById('resultArea');
    console.log(typeof(userData));
    
    for(let i=0;i<userData.length;i++) {
        resultArea.insertAdjacentHTML('beforeend', `<tr id=${i}>
        <td>${userData[i]['name']}</td>
        <td>${userData[i]['mail']}</td>
        <td>${userData[i]['password']}</td>
        <td>${userData[i]['DOB']}</td>
        <td>${userData[i]['age']}</td>
        <td>
            <button onclick="editUser('${i}')">Edit</button>
            <button onclick="deleteUser('${i}')">Delete</button>
        </td>
    </tr>`);
    };
}
        
    

function deleteUser(trId) {

    let data = JSON.parse(localStorage.getItem('users_'));
    data.splice(trId,1);
    localStorage.setItem('users_',JSON.stringify(data));
    userCount = Math.max(0, userCount - 1);
    localStorage.setItem('userCount', userCount);
    var trElement = document.getElementById(trId);
    trElement.parentNode.removeChild(trElement);
}


function saveEdit(trId) {
    event.preventDefault();

    console.log('id is : ', trId)
    if (trId) {
        console.log('data');

        var userName = document.getElementById('name').value;
        var mail = document.getElementById('mail').value;
        var password = document.getElementById('password').value;
        var DOB = document.getElementById('DOB').value;
        var age = null;


        if (userName !== '' && isNaN(DOB) && password !== '' && mail !== '') {
            var data = {
                'name': userName,
                'mail': mail,
                'password': password,
                'DOB': DOB,
                'age': age,

            };
            console.log(data);
            let oldData = JSON.parse(localStorage.getItem('users_'));
            console.log(oldData);
            oldData.splice(trId, 1, data);
            console.log(oldData);

            localStorage.setItem('users_', JSON.stringify(oldData));

            var trElement = document.getElementById(trId);
            trElement.parentNode.removeChild(trElement);

            // Update the displayed row with the edited data
            var resultArea = document.getElementById('resultArea');
            console.log('here')
            resultArea.insertAdjacentHTML('beforeend', `<tr id="${trId}">
            <td>${data['name']}</td>
            <td>${data['mail']}</td>
            <td>${data['password']}</td>
            <td>${data['DOB']}</td>
            <td>${data['age']}</td>
            <td>
                <button onclick="editUser('${trId}')">Edit</button>
                <button onclick="deleteUser('${trId}')">Delete</button>
            </td>
        </tr>`);
        }

        // Clear the form and the hidden field after saving the edit
        document.getElementById('name').value = '';
        document.getElementById('mail').value = '';
        document.getElementById('password').value = '';
        document.getElementById('DOB').value = '';

        var changeAddUser = document.getElementsByClassName('addUser');

        changeAddUser[0].textContent = 'Add User';
        changeAddUser[1].textContent = 'Add User';
        changeAddUser[1].setAttribute('onclick', 'verifyAndAdd()');
    }
}
