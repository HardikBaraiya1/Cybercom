var rowId;
const PRIORITYSYNC = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
}
//login
function logIn(){
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users'));

    console.log('called');

    for(let i=0;i<users.length;i++){
    console.log('loop called');
    // console.log(users[i].password , password)
        if(users[i].mail == mail && users[i].password ==password){
            let userData = mail.split('@')[0];
            window.location.href='homePage.html?'+'u=' +userData;
        }
        else if(users[i].mail == mail && users[i].password !=password){
        document.getElementById('pass-error').classList += ' d-block'; 
        return false;
        }
    }
    document.getElementById('mail-error').classList += ' d-block';
    

}

//login
function reigsterUser(){
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let Repassword = document.getElementById('re-password').value;
    let mailerror = document.getElementById('mail-error');
    let passerror = document.getElementById('pass-error');
    let rePassError = document.getElementById('re-pass-error');

    mailerror.classList.remove(' d-block');
    passerror.classList.remove(' d-block');
    Repassword.classList.remove(' d-block');
    mailExist-error.classList.remove(' d-block');

    function checkError(){
        if(mail==''){
            mailerror.classList += ' d-block';
            return 1;
        }   
        if(password==''){
            passerror.classList += ' d-block';
            return 1;
        }   
        // if(Repassword=='')  reportError.classList += ' d-block;'
    
        if(password!=Repassword){
            rePassError.classList += ' d-block';
            return 1;
        }
    }
    if(checkError()) return;
    
    let users = JSON.parse(localStorage.getItem('users')) || [];

    console.log('called');

    for(let i=0;i<users.length;i++){
    console.log('loop called');
    // console.log(users[i].password , password)
        if(users[i].mail == mail){
            let regForm = document.getElementById('registerForm');
            regForm.insertAdjacentHTML("afterbegin",`
            <div class="userExist" id="mailExist-error">
                Email already exist!!!
            </div>
            `)
            regForm.reset();
            return;
            
        }
        else{
            let new_user ={
                'mail': mail,
                'password': password
            }
            users.push(new_user);
            localStorage.setItem('users',JSON.stringify(users));

        }
    
    }
}


//register
function register(){
    let users= [
        {
            'mail': 'abc@gmail.com',
            'password': 'abc@123'
        },
        {
            'mail': 'varun@gmaill.com',
            'password': 'varun@123'
        }
    ]
    localStorage.setItem('users',JSON.stringify(users));
}


//showing username and greeting
function getUserName(){
                
    let userNameElement = document.createElement('h2');
    userNameElement.textContent = 'Hello '+userName;
    userNameElement.classList = 'userGreeting';
    tableArea.insertAdjacentElement("beforebegin", userNameElement)
}



//getting old data from db(localstorage)
function getData(key) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, []);
        rowId =1;
        // console.log(rowId)
        return [];
    }
    if(localStorage.getItem(key)==[]) rowId=1;

    return JSON.parse(localStorage.getItem(key));
}



//adding new tasks
function addNewItem(DbKey) {
    let taskName = document.getElementById('taskName').value;
    let dueTime = document.getElementById('dueTime').value;
    let priority = document.getElementById('priority').value;
    let createdOn = new Date().toLocaleString();

    // console.log("Task Name:", taskName);
    // console.log("Due Time:", dueTime);
    // console.log("Priority:", priority);
    // console.log("Created On:", createdOn);
    // console.log(rowId)

    let data = getData(DbKey);
    // console.log(rowId)
    if(rowId===undefined){
        // console.log(rowId)
        rowId=data[(data.length-1)].taskId +1;
    }
    let new_data = {
        taskId: rowId,
        taskName: taskName,
        dueDate:dueTime,
        priority:priority,
        createdOn:createdOn,
        lastModified: '',
    }
    // console.log(data);
    data.push(new_data);
    rowId+=1;
    
    localStorage.setItem(DbKey,JSON.stringify(data));
    // console.log(data);
    loadTaskData(DbKey)

    document.getElementById('taskForm').reset();
    
}

//loading task data of user
function loadTaskData(key){
    let data = getData(key);
        showTable(data);
}

function showTable(data){
    tableArea.innerHTML =`<thead>
    <tr>
        <th>No.</th>
        <th onclick='sortByName()'>Name</th>
        <th onclick='sortByDueDate()'>Must be done by</th>
        <th onclick='sortByPriority()'>Priority</th>
        <th onclick='sortByCreate()'>Created On</th>
        <th onclick='sortByModified()'>Last modified</th>
        <th>Edit/Delete</th>
    </tr>
</thead>`;

for(let i=0;i<data.length;i++){
// console.log(data[i])
let taskId = data[i].taskId;
let modifiedDate = data[i].lastModified || 'Not modified';
tableArea.insertAdjacentHTML("beforeend",` <tr id=tr_${taskId}>
<td>${i+1}</td>
<td>${data[i].taskName}</td>
<td>${data[i].dueDate}</td>
<td>${PRIORITYSYNC[data[i].priority]}</td>
<td>${data[i].createdOn}</td>
<td>${modifiedDate}</td>
<td>
<button onclick="editItem('${taskId}')">Edit</button>
<button onclick="deleteItem('${taskId}')">Delete</button>
</td>   

</tr>
`)
}
}

function deleteItem(tId){
    let data = getData(DbKey);
    console.log(data);
    tId = tId.split('_');
    console.log(tId);

    for(var i=0;i<data.length;i++){
        if(data[i].taskId==tId){
            var deletedItem = data.splice(i,1);
            break;
        }
    }
    console.log(i);
    localStorage.setItem(DbKey,JSON.stringify(data));
    // let tableRow = document.getElementById(tId);
    // tableRow.parentElement.removeChild(tableRow);
    loadTaskData(DbKey);
}

var indexOfEdit;

function editItem(tId){
    let data = getData(DbKey);
    console.log(data);

    for(let i=0;i<data.length;i++){
        if(data[i].taskId==tId){
             document.getElementById('taskName').value = data[i].taskName;
             document.getElementById('dueTime').value = takeDateFormat(data[i].dueDate);
             document.getElementById('priority').value = data[i].priority;
             let submitBtn = document.getElementById('submitBtn');
             submitBtn.classList.add('dNone');
             let updateBtn = document.getElementById('updateBtn');
             updateBtn.classList.remove('dNone');
             indexOfEdit = i;
             break;
            }
        } 

        
    }

    



function takeDateFormat(dateString){
let dateParts = dateString.split("-"); // Split the string into parts
let year = parseInt(dateParts[0]);
let month = parseInt(dateParts[1]) - 1; // Month is zero-indexed in JavaScript Date objects
let day = parseInt(dateParts[2]) +1;

// Create a new Date object with the parsed date parts
let dateObject = new Date(year, month, day);

// Set the value of the input element
return dateObject.toISOString().split('T')[0];



}


function editTheChange(){
        let data = getData(DbKey);
        let taskName = document.getElementById('taskName').value;
        let dueTime = document.getElementById('dueTime').value;
        let priority = document.getElementById('priority').value;
        let lastModified = new Date().toLocaleString();
        let submitBtn = document.getElementById('submitBtn');
        let updateBtn = document.getElementById('updateBtn');



        // console.log("Task Name:", taskName);
        // console.log("Due Time:", dueTime);
        // console.log("Priority:", priority);
        // console.log("Created On:", createdOn);
    
    
        let new_data = {
            taskId: data[indexOfEdit].taskId,
            taskName: taskName,
            dueDate:dueTime,
            priority:priority,
            createdOn:data[indexOfEdit].createdOn,
            lastModified: lastModified,
        }
        // console.log(data);
        data.splice(indexOfEdit,1,new_data);
        
        
        localStorage.setItem(DbKey,JSON.stringify(data));
        console.log(data);
        loadTaskData(DbKey);

        submitBtn.classList.remove('dNone');
        updateBtn.classList.add('dNone');

        
        document.getElementById('taskForm').reset();
        
    }



// sorting the data 
function sortByPriority(){
    // document.body.style.backgroundColor = 'red';         //checking the function is calling or not 
    let data = getData(DbKey);
    // console.log(data);
    data.reverse((a,b)=>parseInt(a.priority)-parseInt(b.priority));    
    // console.log(data);

    showTable(data);

}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------
// The function calculates 40 - 100 (a - b), and since the result is negative (-60),  the sort function will sort 40 as a value lower than 100.

// It subtracts the priority of b from the priority of a.
// If the result is negative, a is placed before b. a-b<0 --> a first
// If the result is positive, b is placed before a. a-b>0 --> b first
// If the result is zero, the order remains unchanged. =0 --> no change
// -----------------------------------------------------------------------------------------------------------------------------------------------------------



function sortByDueDate(){
    // document.body.style.backgroundColor = 'red';         //checking the function is calling or not 
    let data = getData(DbKey);
    // console.log(data);
    data.sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
    console.log(data);

    showTable(data);

}

function sortByName(){
    // document.body.style.backgroundColor = 'red';         //checking the function is calling or not 
    let data = getData(DbKey);
    // console.log(data);
    data.sort((a,b)=>{
        if(a.taskName < b.taskName) return -1;
        if(a.taskName > b.taskName) return 1;
        return 0;
    });
    console.log(data);

    showTable(data);

}

function sortByCreate(){
    // document.body.style.backgroundColor = 'red';         //checking the function is calling or not 
    let data = getData(DbKey);
    // console.log(data);
    data.sort((a,b)=>new Date(a.createdOn)-new Date(b.createdOn));
    console.log(data);

    showTable(data);

}

function sortByModified(){
    // document.body.style.backgroundColor = 'red';         //checking the function is calling or not 
    let data = getData(DbKey);
    // console.log(data);
    data.sort((a,b)=>{
        if(a.lastModified=='' && a.lastModified=='') return 0;
        if(a.lastModified=='' && b.lastModified!='') return 1;
        if(b.lastModified=='' && a.lastModified!='') return -1;

        let modifDateA = new Date(a.lastModified)
        let modifDateB = new Date(b.lastModified) 
        return modifDateA-modifDateB;  
    }
    );
    console.log(data);

    showTable(data);

}