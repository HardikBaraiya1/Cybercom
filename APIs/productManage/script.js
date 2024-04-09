const url = 'https://api.escuelajs.co/api/v1/products';
const imgUrl = 'https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=1024x1024&w=is&k=20&c=K8yBJVB-TtpPF1O2zOhVlzXECDxJsadlRrLf4gXXNkk=';

var fetchedDataResult;

async function firstFetchData(){
    return await fetchData().then((data)=>{
        fetchedDataResult = data;
        return fetchedDataResult;
    }).catch((Error)=>console.log(Error))
    // console.log(fetchedDataResult);
}

// function fetching() {
//     return fetch(url, {
//         method: 'GET',

//     })
//         .then((Response) => Response.json())
//         .then((data) => show(data))
//         .catch((Error) => console.log(Error))
// }


function fetchData() {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',

        })
            .then((Response) => resolve(Response.json()))
            // .then((data)=>show(data))
            .catch((Error) => {
                console.log(Error)
                reject(Error)
            })

    })
}

async function getCategories() {
    return fetch('https://api.escuelajs.co/api/v1/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((Response) =>Response.json())
            .catch((Error) => console.log(Error))
    
}

// fetching();


//show everything
function show(data) {
    console.log(data)
    let area = document.getElementById('mainArea');

    area.innerHTML = ''

    data.forEach(data => {
        console.log(data.id)
        area.insertAdjacentHTML("beforeend", `
    <div class="card cards mb-3" id="${data.id}" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                  <img src="${imgUrl}" class="img-fluid rounded-start" alt="...">
                  <h5 class="card-title mt-3">${data.title}</h5>
                  <h6>$ ${data.price}</h6>
                </div>
            <div class="col-md-8">
            <div class="card-body">
            <h3>Description</h3>
        <p class="card-text">${data.description}</p>
        <p class="card-text text-muted mt-4"><small class="text-body-secondary">Last updated at ${data.updatedAt}</small></p>
        <button class="btn btn-success" onclick="location.href='edit.html?i=${data.id}'">Edit</button>
        <button class="btn btn-danger" onclick="Delete(${data.id})">Delete</button>
      </div>
    </div>
  </div>
</div>
    `)
    });
}



function Delete(id) {
    console.log(id)
    let resultArea = document.getElementById('resultArea');
    let DeleteUrl = url + '/' + id
    fetch(DeleteUrl, {
        method: 'DELETE',

    })
        .then((success) => {
            if (success) {

                let resultArea = document.getElementById('resultArea');

                document.getElementById(id).remove();

                resultArea.textContent = 'Deleted Successfully...'
                resultArea.classList.remove('d-none');

                setTimeout(() => {
                    resultArea.classList.add('d-none')
                }, 3000);
            }
        })
}


function addProduct() {

    let title = document.getElementById('title').value;
    let price = Number(document.getElementById('price').value);
    let disc = document.getElementById('description').value;
    let id = Number(document.querySelector('input[name="category"]:checked').value);
    let imgUrl = document.getElementById('images').value;

    let data = JSON.stringify({
        "title": title,
        "price": parseInt(price),
        "description": disc,
        "categoryId": parseInt(id),
        "images": [imgUrl]
    })
    console.log(data, typeof (imgUrl))


    console.log(url)
    fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "price": parseInt(price),
            "description": disc,
            "categoryId": parseInt(id),
            "images": [imgUrl]
        }),
    })
        .then((Response) => Response.json())
        .then((data) => console.log("succesfully added: ", data))
        .then(() => successAdded('Product Added Succesfully...'))
        .catch((Error) => {
            console.log(Error)
            errorInAdded('New product cannot be added due to some error...')
        })


    //     fetch('https://api.escuelajs.co/api/v1/products/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "title": "New Product",
    //     "price": 10,
    //     "description": "A description",
    //     "categoryId": 1,
    //     "images": ["https://placeimg.com/640/480/any"]
    //   })
    // })
    // .then(response => {
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });

}



function successAdded(msg) {
    let resultArea = document.getElementById('resultAdded');

    resultArea.textContent = msg;

    resultArea.classList.remove('d-none');

    setTimeout(() => {
        resultArea.classList.add('d-none');
    }, 3000);
}


function errorInAdded(msg) {
    let resultArea = document.getElementById('resultAdded');

    resultArea.textContent = msg;
    resultArea.style.color = 'red';
    resultArea.classList.remove('d-none');

    setTimeout(() => {
        resultArea.classList.add('d-none');
    }, 3000);
}

async function search() {
    let input = document.getElementById('searchInput').value;
    fetchedDataResult = await fetchData();
    find(input)
}

function filter(){
    let data = document.getElementById('categoryFilter').value;
    console.log('value of category: ',data);
    find(data)
}

async function find(input) {
    const data = fetchedDataResult;

    console.log(data);

    // const searchTerm = input.toLowercase();

    const filteredData =await data.filter(data => {
        return (
            data.title.toLowerCase().includes(input.toLowerCase()) || data.description.toLowerCase().includes(input.toLowerCase())
        );
    });

    console.log('filteredData:', filteredData)

    if (filteredData.length === 0) {
        let area = document.getElementById('mainArea');
        area.innerHTML = '<h2 class"resultMsgArea mt-3" style="color:red">No data Found</h2>'
        document.querySelectorAll('.pageBtns').forEach((btns)=>btns.remove())
        document.getElementById('prevButton').remove();
        document.getElementById('nextButton').remove();

        return
    }
    fetchedDataResult = filteredData;

    // show(filteredData)
    displayUsingPaging(fetchedDataResult,'');

}


async function showCategories() {
    const area = document.getElementById('categoryArea');
    console.log('called')

    const data =await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((Response) => {
        return Response.json()
    })
    console.log('data are: ', data)




    console.log('called')

    data.forEach(category => {
        let btnArea = document.createElement('div');
        let radiobtn = document.createElement('input');

        btnArea.classList.add('radioBtnArea');
        radiobtn.type = 'radio';
        radiobtn.name = 'category';
        radiobtn.value = category.id;

        let label = document.createElement('label');

        label.textContent = category.name;
        label.classList.add('me-3', 'ms-1')


        btnArea.append(radiobtn, label)
        area.appendChild(btnArea);
    });

}






var currentPage;

async function displayUsingPaging(data, move) {
    const itemsPerPage = 4;
    console.log('called and data are:', data)
    // const data = fetchedDataResult;

    generatePageNumbers(data.length, itemsPerPage);

    console.log(typeof (move))
    if (move === 'inc' && currentPage < data.length) currentPage++;
    else if (move === 'dec' && currentPage > 0) currentPage--;
    else if (move) currentPage = move;
    else  currentPage = 1
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log([currentPage, startIndex, endIndex, data, typeof (data)])
    const currentItems = data.slice(startIndex, endIndex);

    if (currentPage == 1)
        document.getElementById('prevButton').disabled = true;
    else
        document.getElementById('prevButton').disabled = false;


    if (endIndex >= data.length)
        document.getElementById('nextButton').disabled = true;
    else
        document.getElementById('nextButton').disabled = false;

    // const area = document.getElementById('mainArea');

    // area.innerHTML = '';

    show(currentItems);
}

const displayUsingPage = (move)=> displayUsingPaging(fetchedDataResult,move)

// // Event listener for next button
// document.getElementById('nextButton').addEventListener('click',displayUsingPage('inc'));

// // Event listener for previous button
// document.getElementById('prevButton').addEventListener('click',displayUsingPage('dec'));


function generatePageNumbers(totalItems, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [];

    let btns = document.querySelectorAll('.pageBtns').forEach((btns)=>btns.remove())

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    let btnArea = document.getElementById('nextButton');

    pageNumbers.forEach(pageBtn => {
        let btn = document.createElement('button');
        btn.textContent = pageBtn;
        btn.setAttribute('onclick', `displayUsingPage(${pageBtn})`);
        btn.classList.add('btn', 'btn-success', 'btn-sm', 'pageBtns')
        btnArea.insertAdjacentElement("beforebegin", btn);
    });
}


async function makeFilter() {
    let area = document.getElementById('categoryFilter');
    let data =await getCategories();
    console.log(data)

    data.forEach((category) => {
        let option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        area.appendChild(option);
    })
        document.getElementById('categoryArea').classList.remove('d-none');
}


async function sort(){
    let val = document.getElementById('sort').value;
    console.log(val);

    let data = await fetchData();
    fetchedDataResult = data;

    if(val==='price'){
        data.sort((a,b)=>{
            if(a.price - b.price >0) return 1
            else if(a.price - b.price <0) return -1
            else if(a.price - b.price == 0) return 0
        });
    }
    // console.log(data);
    // show(data);
    displayUsingPaging(data,'');
}


function Edit(){
    const id = document.getElementById('editProduct').getAttribute('productId');
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const  disc = document.getElementById('description').value;


    const update = JSON.stringify({
        "title": title,
        "price": Number(price),
        "description": disc,
    });

    console.log(url+'/'+id)
    fetch(url+'/'+id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "price": Number(price),
            "description": disc

        }),
    })
    .then((Response)=>Response.json())
    .then((data) => console.log("succesfully added: ", data))
    .then(() => successAdded('Product Updated Succesfully...'))
    .catch((Error) => {
        console.log(Error)
        errorInAdded('Product cannot be Updated due to some error...')
    })
}