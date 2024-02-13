//getting old data from db(localstorage)
function getData(key) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, []);

        return [];
    }

    return JSON.parse(localStorage.getItem(key));
}


//login
function logIn() {
    let type = document.getElementById('type').value;
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let users = (type == 'Doctor') ? JSON.parse(localStorage.getItem('doctors')) || [] : JSON.parse(localStorage.getItem('patients'));

    console.log('called');

    for (let i = 0; i < users.length; i++) {
        console.log('loop called');
        // console.log(users[i].password , password)
        if (users[i].mail == mail && users[i].password == password) {
            let userData = mail.split('@')[0];
            let path = (type == 'doctor') ? 'doctorHomePage.html' : 'homePage.html';
            window.location.href = path + '?u=' + userData;
        }
        else if (users[i].mail == mail && users[i].password != password) {
            document.getElementById('pass-error').classList.add('d-block');
            return false;
        }
    }
    document.getElementById('mail-error').classList.add('d-block');


}


//register
function reigsterUser() {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let Repassword = document.getElementById('re-password').value;
    let type = document.getElementById('type').value;
    let mailerror = document.getElementById('mail-error');
    let passerror = document.getElementById('pass-error');
    let rePassError = document.getElementById('re-pass-error');
    let mailExistError = document.getElementById('mailExist-error');

    if (mailerror.classList.contains('d-block')) mailerror.classList.remove('d-block');
    if (passerror.classList.contains('d-block')) passerror.classList.remove('d-block');
    if (rePassError.classList.contains('d-block')) rePassError.classList.remove('d-block');
    if (mailExistError.classList.contains('d-block')) mailExistError.classList.remove('d-block');

    function checkError() {
        if (mail == '') {
            mailerror.classList += 'd-block';
            return 1;
        }
        if (password == '') {
            passerror.classList += 'd-block';
            return 1;
        }
        // if(Repassword=='')  reportError.classList += 'd-block;'

        if (password != Repassword) {
            rePassError.classList += 'd-block';
            return 1;
        }
    }
    if (checkError()) return;

    let users = (type == 'doctor') ? JSON.parse(localStorage.getItem('doctors')) || [] : JSON.parse(localStorage.getItem('patients')) || [];

    console.log(type, 'called', users);

    if (users.length == 0) {
        let new_user = {
            'mail': mail,
            'password': password
        }
        users.push(new_user);
        console.log(users);
        (type == 'doctor') ? JSON.parse(localStorage.setItem('doctors', JSON.stringify(users))) : JSON.parse(localStorage.setItem('patients', JSON.stringify(users)));
    } else {

        for (let i = 0; i < users.length; i++) {
            console.log('loop called');
            // console.log(users[i].password , password)
            if (users[i].mail == mail) {
                document.getElementById('mailExist-error').classList += 'd-block';

                document.getElementById('registerForm').reset();
                return;

            }
            else {
                let new_user = {
                    'mail': mail,
                    'password': password
                }
                users.push(new_user);
                (type == 'doctor') ? JSON.parse(localStorage.setItem('doctors', JSON.stringify(users))) : JSON.parse(localStorage.setItem('patients', JSON.stringify(users)));

            }

        }
    }

}


//doctor Page

function takeData() {
    let avail = document.querySelectorAll('input[type="checkbox"');
    console.log(avail);

    let selected = [];

    avail.forEach(checkbox => {
        if (checkbox.checked) selected.push(checkbox.value);
    });

    console.log(selected)
    return selected;
}


function checkDetails(user) {
    console.log(localStorage.getItem(user))
    if (localStorage.getItem(user)) {
        let area = document.getElementById('yourDetail');
        area.textContent = `Hello Doctor, ${user}`
    }
    else {
        let area = document.getElementById('yourDetail');

        area.innerHTML = `
        <div class="d-none" id="name-error">Please enter your name</div>
        <input type="text" class="form-control detail" name="name" id="name" placeholder="Enter your Name" required>
        `;
        // <button onclick="addDetails()">Add Personal Details</button>
        // <input type="text" class="form-control detail" name="address" id="address" placeholder="Enter your Address">



    }
}

function addDetails() {
    let name = document.getElementById('name');
    // let addess = document.getElementById('address').value;

    if (name.value == '') {
        document.getElementById('name-error').classList = 'nameError'
    } else {
        let data = {
            name: name.value,
            avail: takeData()
        }
        setTimeout(() => {
            localStorage.setItem(userName, JSON.stringify(data));
        }, 2000);
    }
}


function appointment(){

}



// patient 
function loadData() {
    let doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    let area = document.getElementById('mainArea');
    let docName = []
    if (doctors.length == 0) return mainArea.textContent = 'No Doctors are there right now..!'
    else {
        doctors.forEach(doctor => {
            let key = doctor.mail.split('@')[0];
            console.log(doctor, key)
            let data = []
            let docData = JSON.parse(localStorage.getItem(key));
            console.log(docData);
            data.push(docData)

            data.forEach(doctor => {

                // Create a card for each doctor
                const doctorCard = document.createElement('div');
                doctorCard.classList.add('card', 'mb-3', 'cards');

                // Create card header for the doctor's name
                const cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header', 'header');
                cardHeader.textContent = doctor.name;
                doctorCard.appendChild(cardHeader);

                // Create card body for the doctor's availability slots
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                // Create radio buttons for each availability slot
                doctor.avail.forEach(slot => {
                    const slotLabel = document.createElement('label');
                    slotLabel.classList.add('mr-2');
                    slotLabel.textContent = `${slot}:00 - ${parseInt(slot) + 1}:00`;

                    const slotInput = document.createElement('input');
                    slotInput.type = 'radio';
                    slotInput.name = doctor.name; // Use doctor's name as the radio button group name
                    slotInput.value = slot;

                    slotLabel.appendChild(slotInput);
                    cardBody.appendChild(slotLabel);
                });

                doctorCard.appendChild(cardBody);

                // Append the doctor's div to the doctor list container
                area.appendChild(doctorCard);
            });
        });
    }
}


function book() {

    const bookings = [];

    const selectedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');

    selectedRadioButtons.forEach(slot => {
        const doctorName = slot.name;
        //   console.log(slot)
        // Push an object containing the doctor's name and selected slot value to the bookings array
        bookings.push({
            doctor: doctorName,
            slot: slot.value
        });
        localStorage.setItem('slotBooked', JSON.stringify(bookings));
    });

    // Process bookings data here
    console.log(bookings);
    // You can add further logic here to handle the booking process
}

