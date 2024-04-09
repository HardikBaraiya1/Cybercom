//XHR
var area = document.getElementById('mainArea');

const getDataUsingXhr = () => {
    console.log('called');
    let xhrObj1 = new XMLHttpRequest();

    // open(method, url, async, user, password)
    xhrObj1.open("GET", 'https://reqres.in/api/users', true);
    // The XMLHttpRequest method open() initializes a newly-created request, or re-initializes an existing one.


    //-----------------------------------------------------------------------------------------------------------
    // The readystatechange event is fired whenever the readyState property of the XMLHttpRequest changes.

    // Warning: This should not be used with synchronous requests and must not be used from native code.
    // addEventListener("readystatechange", (event) => {});

    // onreadystatechange = (event) => {};

    xhrObj1.onreadystatechange = function () {
        if (xhrObj1.readyState === XMLHttpRequest.DONE && xhrObj1.status === 200) {

            if (xhrObj1?.response) {
                const recievedData = xhrObj1?.response;
                console.log('Data is', recievedData);
                area.textContent = recievedData;
            }
        }

    }
    xhrObj1.send();
}

const getSPecificDataUsingXhr = () => {
    console.log('we entered')
    let xhrObj2 = new XMLHttpRequest();

    xhrObj2.open("GET", 'https://reqres.in/api/users/2', true);

    xhrObj2.onreadystatechange = () => {
        if (xhrObj2.readyState === XMLHttpRequest.DONE && xhrObj2.status === 200) {

            if (xhrObj2?.response) {
                const recievedData = xhrObj2?.response;
                console.log(recievedData);
                area.textContent = recievedData;
            }
        }
    }
    xhrObj2.send();
}

const createDataUsingXhr = () => {
    console.log('entered');

    let xhrObj3 = new XMLHttpRequest();

    xhrObj3.open("POST", 'https://reqres.in/api/users', true);

    xhrObj3.onreadystatechange = () => {
        // console.log('entered');

        if (xhrObj3.readyState === XMLHttpRequest.DONE && xhrObj3.status === 201) {
            console.log('entered');

            if (xhrObj3?.response) {
                console.log('entered');

                const recievedData = xhrObj3?.response;
                console.log(JSON.parse(recievedData));
                area.textContent = recievedData;
            }
        }
    }
    xhrObj3.send(
        {
            name: "Hardik",
            job: "Intern"
        }
    );
}

const updateDataUsingXhr = ()=>{
    let xhrObj4 = new XMLHttpRequest();

    xhrObj4.open("PUT",'https://reqres.in/api/users/2',true);

    xhrObj4.onreadystatechange = ()=>{

        if (xhrObj4.readyState===XMLHttpRequest.DONE && xhrObj4.status===200) {
            
            if(xhrObj4?.response){
                let recievedData = xhrObj4?.response;
                console.log(JSON.parse(recievedData));
                area.textContent = recievedData || 'Nothing Recieved';
            }
        }
    }
    xhrObj4.send(
        {
            name: "hardik",
            job: "intern"
        }
    )
}

const deleteDataUsingXhr = ()=>{
    let xhrObj5 = new XMLHttpRequest();
    console.log('here')
    xhrObj5.open("DELETE",'https://reqres.in/api/users/2',true);

    xhrObj5.onreadystatechange = ()=>{
        if(xhrObj5.readyState===XMLHttpRequest.DONE && xhrObj5.status===204){

            console.log('Deleted..');

        }
    }
    xhrObj5.send();
}