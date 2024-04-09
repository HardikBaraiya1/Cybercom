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

    let users = (type == 'doctor') ? JSON.parse(localStorage.getItem('doctors')) || [] : JSON.parse(localStorage.getItem('patients'))  || [] ;

    console.log('called',users);

    for (let i = 0; i < users.length; i++) {
        console.log('loop called');
        // console.log(users[i].password , password)
        if (users[i].mail == mail && users[i].password == password) {
            let userData = mail.split('@')[0];
            let path = (type == 'doctor') ? 'doctorHomePage.html' : 'homePage.html';
            (type == 'doctor') ?  sessionStorage.setItem('docSession',JSON.stringify(users[i])): sessionStorage.setItem('patientSession',JSON.stringify(users[i]));;
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
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let Repassword = document.getElementById('re-password').value;
    let type = document.getElementById('type').value;
    let mailerror = document.getElementById('mail-error');
    let userNameError = document.getElementById('userName-error');
    let passerror = document.getElementById('pass-error');
    let rePassError = document.getElementById('re-pass-error');
    let mailExistError = document.getElementById('mailExist-error');

    if (mailerror.classList.contains('d-block')) mailerror.classList.remove('d-block');
    if (userNameError.classList.contains('d-block')) userNameError.classList.remove('d-block');
    if (passerror.classList.contains('d-block')) passerror.classList.remove('d-block');
    if (rePassError.classList.contains('d-block')) rePassError.classList.remove('d-block');
    if (mailExistError.classList.contains('d-block')) mailExistError.classList.remove('d-block');

    function checkError() {
        if (mail == '') {
            mailerror.classList += 'd-block';
            return 1;
        }
        if (userName == '') {
            userNameError.classList += 'd-block';
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
            'id': (type == 'doctor') ? 'docId'+(users.length+1) : 'patientId'+(users.length+1),
            'name': userName,
            'mail': mail,
            'password': password
        }
        users.push(new_user);
        console.log(users);
        (type == 'doctor') ? localStorage.setItem('doctors', JSON.stringify(users)) : localStorage.setItem('patients', JSON.stringify(users));
    } else {

        for (let i = 0; i < users.length; i++) {
            console.log('loop called');
            // console.log(users[i].password , password)
            if (users[i].mail == mail) {
                document.getElementById('mailExist-error').classList += 'd-block';

                document.getElementById('registerForm').reset();
                console.log('returning')
                return;

            }}
            
                let new_user = {
                    'id': (type == 'doctor') ? 'docId'+(users.length+1) : 'patientId'+(users.length+1),
                    'mail': mail,
                    'name': userName,
                    'password': password
                }
                users.push(new_user);
                (type == 'doctor') ? localStorage.setItem('doctors', JSON.stringify(users)) : localStorage.setItem('patients', JSON.stringify(users));
                console.log('we are here')

            }

        
    
    console.log('we are here')
    document.getElementById('registerSuccess').classList.remove('d-none');
    setTimeout(() => {
        window.location.href='login.html'
    }, 5000);

}


//doctor Page
function takeData() {
    let avail = document.querySelectorAll('input[type="checkbox"]');
    console.log(avail);

    let selected = [];

    avail.forEach(checkbox => {
        if (checkbox.checked) selected.push(checkbox.value);
    });

    console.log(selected)
    return selected;
}

var docName;

function checkDetails() {
    let success = 0;
    let data = JSON.parse(localStorage.getItem('docData')) || [];
    let sessionData = JSON.parse(sessionStorage.getItem('docSession'));
    console.log(data,sessionData)
    data.forEach(doc => {
        // console.log(doc.id,sessionData.id)
        // console.log(doc.name)
        // console.log(doc.id===sessionData.id)
        
        if(doc.id==sessionData.id){
        let area = document.getElementById('yourDetail');
        area.textContent = `Hello doctor, ${doc.name}`
        docName=doc.name;
        success = 1;
        return;
    }});
    if(!success) generateNameInput();
   }
   

function generateNameInput(){
    let area = document.getElementById('yourDetail');

        area.innerHTML = `
        <div class="d-none" id="name-error">Please enter your name</div>
        <input type="text" class="form-control detail" name="name" id="name" placeholder="Enter your Name" required>
        `;
}

function addDetails() {
    let done = 0;
    let oldData =  JSON.parse(localStorage.getItem('docData')) || [];
    let sessionData = JSON.parse(sessionStorage.getItem('docSession'));
    let availData = takeData();
    console.log(availData);

    if(document.getElementById('name')) {
        console.log('in if')
        if (document.getElementById('name').value == '') {
            document.getElementById('name-error').classList = 'nameError'
        }
        else docName = document.getElementById('name').value;
    }
    // let addess = document.getElementById('address').value;
    else{
        console.log('in else part')
        console.log(sessionData);

        oldData.forEach(doc => {
            if(doc.id===sessionData.id){
                doc.name = docName,
                doc.avail = availData
                return done = 1;
            }
        });
    }
        if(!done){
            let data = {
                id: sessionData.id,
                name: docName,
                avail: availData,
            }
            setTimeout(() => {
                oldData.push(data);
            }, 500);
        }
    
        setTimeout(() => {
            console.log('pushing',oldData[0].avail)
            localStorage.setItem('docData', JSON.stringify(oldData));
            checkDetails();
        }, 2000);
    }



function appointment(){

}



// patient 
function loadData() {
    let doctors = JSON.parse(localStorage.getItem('docData')) || [];
    let area = document.getElementById('displayDoctors');
    let docName = []
    if(doctors.length == 0) area.innerHTML = '<h5 class="text-center my-3">No doctors are available right now..!!!</h5>';
            doctors.forEach(doctor => {

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

                if(doctor.avail.length == 0){
                    cardBody.innerHTML = `
                        <h4> Doctor is not available for the day!!</h4>
                    `
                }
                // Create radio buttons for each availability slot
                else{
                    doctor.avail.forEach(slot => {
                    const slotLabel = document.createElement('label');
                    slotLabel.classList.add('mx-2','p-1','labels');
                    slotLabel.textContent = `${slot}:00 - ${parseInt(slot) + 1}:00`;

                    const slotInput = document.createElement('input');
                    slotInput.type = 'radio';
                    slotInput.name = doctor.id; // Use doctor's name as the radio button group name
                    slotInput.value = slot;

                    slotLabel.appendChild(slotInput);
                    cardBody.appendChild(slotLabel);
                });}

                doctorCard.appendChild(cardBody);

                // Append the doctor's div to the doctor list container
                area.appendChild(doctorCard);
            });
        }
    


function book() {

    const bookings = JSON.parse(localStorage.getItem('slotBooked')) || [];

    const selectedRadioButtons = document.querySelectorAll('input[type="radio"]:checked');
    let doctors = JSON.parse(localStorage.getItem('docData')) || [];
    selectedRadioButtons.forEach(slot => {
        const patientData = JSON.parse(sessionStorage.getItem('patientSession'));
        const doctorId = slot.name;
        let docname ;  
         
        //taking docName again 
        doctors.forEach(doctor => {
        if(doctor.id==slot.name){
            docname = doctor.name;
            return;
        }
        });



          console.log(doctorId,docname)
        // Push an object containing the doctor's name and selected slot value to the bookings array
        bookings.push({
            patientId: patientData.id,
            patientName: patientData.name,
            doctorId: doctorId,
            doctorName: docname,
            slot: slot.value,
            status: 'Pending',
        });
        localStorage.setItem('slotBooked', JSON.stringify(bookings));
    });

    console.log(bookings);
    clearTable('bookedSlots');
    showBookedSlots()
}


function showBookedSlots(){
    let booked = JSON.parse(localStorage.getItem('slotBooked')) || [];
    let sessionData = JSON.parse(sessionStorage.getItem('patientSession'));
    let bookedPlayingArea = document.getElementById('bookedSlots'); 
    // let bookingAvailale = 0;
    let bookings=[];

    console.log(booked);
    booked.forEach(booking => {
        console.log(booking.patientId,sessionData.id)
        if(booking.patientId == sessionData.id){
            bookings.push(booking);
            // bookingAvailale = 1;
        }
    });

    if(bookings.length==0){
        console.log('in if');
        bookedPlayingArea.innerHTML = '<h4 class="text-center my3"> Your have no upcoming appointments...!!</h4>';
    }
    else{
        console.log('in else');
        let heading = document.createElement('h5');
        heading.textContent = 'Your upcoming appointments are: ';
        bookedPlayingArea.appendChild(heading);

        let table = document.createElement('table');
        table.classList.add('table')
        let tableHead = document.createElement('thead');
        tableHead.classList.add('tableRow','table-secondary');
        let head1 = document.createElement('th');
        let head2 = document.createElement('th');
        let head3 = document.createElement('th');

        head1.textContent = "Doctor Name";
        head2.textContent = "Appoitment Timing (00-24)";
        head3.textContent = "Status";
        tableHead.appendChild(head1);
        tableHead.appendChild(head2);
        tableHead.appendChild(head3);

        table.appendChild(tableHead);


        bookings.forEach(booking => {
            let newRow = document.createElement('tr');
            newRow.classList.add('tableRow')
            let docName = document.createElement('td');
            let appointTime = document.createElement('td');
            let status = document.createElement('td');

            docName.textContent = booking.doctorName;
            appointTime.textContent = `${booking.slot}:00 to ${parseInt(booking.slot) +1}:00`;
            status.textContent = booking.status;
            newRow.appendChild(docName);
            newRow.appendChild(appointTime); 
            newRow.appendChild(status); 

            table.appendChild(newRow);
        });
        bookedPlayingArea.appendChild(table);
    }
}

function clearTable(id){
   document.getElementById(id).innerHTML =''; 

}



//apppointment handling on doctor side
function showAppointments(){
    let booked = JSON.parse(localStorage.getItem('slotBooked'));
    let sessionData = JSON.parse(sessionStorage.getItem('docSession'));
    let bookedPlayingArea = document.getElementById('scheduledAppointment'); 
    // let bookingAvailale = 0;
    let bookings=[];

    console.log(booked);
    booked.forEach(booking => {
        console.log(booking.patientId,sessionData.id)
        if(booking.doctorId == sessionData.id){
            bookings.push(booking);
            // bookingAvailale = 1;
        }
    });

    if(bookings.length==0){
        console.log('in if');
        bookedPlayingArea.innerHTML = '<h4 class="text-center my3"> Your have no upcoming appointments...!!</h4>';
    }
    else{
        console.log('in else');
        let heading = document.createElement('h5');
        heading.textContent = 'Your upcoming appointments are: ';
        bookedPlayingArea.appendChild(heading);

        let table = document.createElement('table');
        table.classList.add('myTable')
        let tableHead = document.createElement('thead');
        tableHead.classList.add('tableRow','table-secondary');
        let head1 = document.createElement('th');
        let head2 = document.createElement('th');
        let head3 = document.createElement('th');
        let head4 = document.createElement('th');
        head1.textContent = "Patient Name";
        head2.textContent = "Appoitment Timing (00-24)";
        head3.textContent = "Status";
        head4.textContent = "Confirm";        
        tableHead.appendChild(head1);
        tableHead.appendChild(head2);
        tableHead.appendChild(head3);
        table.appendChild(tableHead);


        bookings.forEach(booking => {
            let newRow = document.createElement('tr');
            newRow.classList.add('tableRow')
            let docName = document.createElement('td');
            let appointTime = document.createElement('td');
            let choose = document.createElement('td');
            let status = document.createElement('td');            
            
            docName.textContent = booking.patientName;
            appointTime.textContent = `${booking.slot}:00 to ${parseInt(booking.slot) +1}:00`;
            status.textContent = booking.status;            
            newRow.appendChild(docName);            
            newRow.appendChild(appointTime); 
            newRow.appendChild(status); 
            if(booking.status != 'Rejected'){
                tableHead.appendChild(head4);
                choose.innerHTML = (booking.status=='Confirm')?
                `<button class='tablebtn btn disabled' id='confirmslot${booking.patientId}' onclick="confirm('${booking.patientId}')">Confirm</button>
                <button class='tablebtn d-none' id='editslot${booking.patientId}' onclick="Edit('${booking.patientId}')">Edit</button>
                <button class='tablebtn d-none' id='deleteslot${booking.patientId}' onclick="deleteItem('${booking.patientId}')">Delete</button>`
                :
                `<button class='tablebtn' id='confirmslot${booking.patientId}' onclick="confirm('${booking.patientId}')">Confirm</button>
                <button class='tablebtn' id='editslot${booking.patientId}' onclick="Edit('${booking.patientId}')">Edit</button>
                <button class='tablebtn' id='deleteslot${booking.patientId}' onclick="deleteItem('${booking.patientId}')">Delete</button>`;
    
                newRow.appendChild(choose);
            }



            table.appendChild(newRow);
        });
        bookedPlayingArea.appendChild(table);
    }
}




//confirmation by doctor
function confirm(id){
    let bookedSlots = JSON.parse(localStorage.getItem('slotBooked'));

    console.log(id,bookedSlots);

    bookedSlots.forEach(booking => {
        if(booking.patientId==id){
            booking.status = 'Confirm';
            // console.log(`editslot${id}`);
            // document.getElementById(`editslot${id}`).classList = 'd-none';
            // document.getElementById(`deleteslot${id}`).classList = 'd-none';
            // document.getElementById(`confirmslot${id}`).classList = 'btn disabled';

            
        }
    });
    console.log(bookedSlots)
    localStorage.setItem('slotBooked',JSON.stringify(bookedSlots));
    clearTable('scheduledAppointment');
    showAppointments();
}

function Edit(id){
    let bookedSlots = JSON.parse(localStorage.getItem('slotBooked'));

    console.log(id,bookedSlots);

    bookedSlots.forEach(booking => {
        if(booking.patientId==id){
            let value = prompt('Choose new timing slot(in 24hrs format must) ex. 00:00 to 23:59');
            value = value.split(':')[0];
            console.log(value);
            booking.slot = value;
        }
    });
    console.log(bookedSlots)
    localStorage.setItem('slotBooked',JSON.stringify(bookedSlots));
    clearTable('scheduledAppointment');
    showAppointments();

}


function deleteItem(id) {
    let bookedSlots = JSON.parse(localStorage.getItem('slotBooked'));

    console.log(id,bookedSlots);
    
    bookedSlots.forEach(booking => {
    if(booking.patientId==id){
        booking.status = 'Rejected';
}});

        console.log(bookedSlots)
        localStorage.setItem('slotBooked',JSON.stringify(bookedSlots));
        clearTable('scheduledAppointment');
        showAppointments();
    
}