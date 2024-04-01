
// function fetch(){
//     let url = 'https://www.colourlovers.com/api/colors/new?format=json';
//     console.log('here')
//     let xhr = new XMLHttpRequest();


//     // console.log(url)

//     xhr.open("GET", url,true);
//     console.log(xhr.status,xhr.response,xhr);
//     xhr.onreadystatechange = ()=>{
//         console.log('stateChanged',xhr.status)
//         if(xhr.readyState==XMLHttpRequest.DONE && xhr.status ==200){

//             if(xhr?.response){
//                 let result = xhr?.response;
//                 console.log(result.json());
//                 area.textContent = result;
//             }
//         }
//     }
//     xhr.send();
// }

function fetching() {
    let area = document.getElementById('ApiArea');

    return new Promise((Response, Reject) => {
        console.log('Fetching Data...');
        area.innerHTML = '<h3 id="waitingMessage">Please be Patient...It may take some time...!!!</h3>'
        fetch('https://api.publicapis.org/entries', {
            method: "GET",

        }).then((Response) => Response.json())
            .then((data) => {
                console.log(data);
                Response(data);
                document.getElementById('waitingMessage').remove();
                document.getElementById('loadBtn').textContent = 'Show More APIs';
                return data;
            })
            .catch((Error) => Reject(Error))
    })

}

// var result;
async function show() {
    let area = document.getElementById('ApiArea');

    // if(!result) result = await fetching();
    let result;
    if (localStorage.getItem('apiData')) {
        result = JSON.parse(localStorage.getItem('apiData'));
    }
    else {
        result = await fetching();
        localStorage.setItem('apiData', JSON.stringify(result));
    }
    document.getElementById('loadBtn').textContent = 'Show More APIs';



    let table;
    if (document.getElementById('resultTable')) {
        table = document.getElementById('resultTable');
        table.textContent = '';
    } else {
        table = document.createElement('table');

        table.setAttribute('id', 'resultTable');
    }
    // area.textContent = result;

    let thead = document.createElement('thead');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');

    th1.textContent = 'Name';
    th2.textContent = 'Category';
    th3.textContent = 'Description';
    th4.textContent = 'Link';
    th5.textContent = 'Save';

    thead.append(th1, th2, th3, th4, th5);
    table.appendChild(thead);

    // console.log(result['entries'][0]);
    let start = Math.floor((Math.random() * result['count']) + 1);
    let end = start + 10;
    console.log('from', start, 'to', end);
    for (let i = start; i < end; i++) {
        let newRow = document.createElement('tr');

        let name = document.createElement('td');
        let cat = document.createElement('td');
        let disc = document.createElement('td');
        let link = document.createElement('td');
        let save = document.createElement('td');

        name.textContent = result['entries'][i].API;
        // newRow.appendChild(name)

        cat.textContent = result['entries'][i].Category;
        // newRow.appendChild(cat);

        disc.textContent = result['entries'][i].Description;
        // newRow.appendChild(disc);

        link.innerHTML = `<a href="${result['entries'][i].Link}" target="_blank">${result['entries'][i].Link}</a>`;
        // newRow.appendChild(link);

        save.innerHTML = `<button onclick="saveApiData(this.id)" id="${i}">Save</button>`;

        newRow.append(name, cat, disc, link, save);

        table.appendChild(newRow);

    }
    area.appendChild(table);
}



function saveApiData(id) {
    console.log('here', id);
    let result;
    if (sessionStorage.getItem('savedAPI')) {
        result = JSON.parse(sessionStorage.getItem('savedAPI'));
    }
    else {
        result = [];
    }

    let APIs = JSON.parse(localStorage.getItem('apiData'));

    let addData = APIs['entries'][id];
    console.log(addData);

    result.push(addData);

    sessionStorage.setItem('savedAPI', JSON.stringify(result));
    console.log('API saved')

    showSavedAPIs();
}


function showSavedAPIs() {
    console.log('called')
    let area = document.getElementById('savedAPIsArea');

    let data;

    if (!sessionStorage.getItem('savedAPI') || sessionStorage.getItem('savedAPI') === '[]') {
        console.log('You dont have any saved API');
        area.innerHTML = '<h3 id="savedApiMsg">You have not saved any API...!!!</h3>'
    }
    else {
        data = JSON.parse(sessionStorage.getItem('savedAPI'));
        console.log('we have Data: ', data);
        (document.getElementById('savedApiMsg'))? document.getElementById('savedApiMsg').textContent = 'Your saved APIs' : area.insertAdjacentHTML("afterbegin", '<h3 id="savedApiMsg">Your saved APIs</h3>')

        let table;

        if (document.getElementById('savedApiTable')) {
            table = document.getElementById('savedApiTable');
            table.textContent = '';
        } else {
            table = document.createElement('table');

            table.setAttribute('id', 'savedApiTable');
        }
        // area.textContent = result;

        let thead = document.createElement('thead');
        let th1 = document.createElement('th');
        let th2 = document.createElement('th');
        let th3 = document.createElement('th');
        let th4 = document.createElement('th');
        let th5 = document.createElement('th');

        th1.textContent = 'Name';
        th2.textContent = 'Category';
        th3.textContent = 'Description';
        th4.textContent = 'Link';
        th5.textContent = 'Remove';

        thead.append(th1, th2, th3, th4, th5);
        table.appendChild(thead);

        // console.log(result['entries'][0]);
        data.forEach((Api, index) => {
            let newRow = document.createElement('tr');
            // console.log(index)
            let name = document.createElement('td');
            let cat = document.createElement('td');
            let disc = document.createElement('td');
            let link = document.createElement('td');
            let remove = document.createElement('td');

            name.textContent = Api.API;
            // newRow.appendChild(name)

            cat.textContent = Api.Category;
            // newRow.appendChild(cat);

            disc.textContent = Api.Description;
            // newRow.appendChild(disc);

            link.innerHTML = `<a href="${Api.Link}" target="_blank">${Api.Link}</a>`;
            // newRow.appendChild(link);

            remove.innerHTML = `<button onclick="removeSavedApi(this.id)" id="${index}">Remove</button>`;


            newRow.append(name, cat, disc, link, remove);

            table.appendChild(newRow);


        });

        area.appendChild(table);
    }
}

function removeSavedApi(id) {
    if (sessionStorage.getItem('savedAPI')) {
        let data = JSON.parse(sessionStorage.getItem('savedAPI'));
        console.log('data received');

        console.log(data, id);
        data.splice(id, 1);
        console.log(data);

        sessionStorage.setItem('savedAPI', JSON.stringify(data));
    }

    showSavedAPIs();
}