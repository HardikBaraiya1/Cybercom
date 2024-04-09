let area = document.getElementById('mainArea');

const   getDataUsingFetch = ()=>{
    fetch('https://reqres.in/api/users',{
        method: "GET",
         headers : {
            "Content-Type": "application/json",
         },
    })
    .then((Response)=>Response.json())
    .then((Response)=>console.log(Response))
    .catch((error)=>console.log(error))

}

const getSpecifDataUSingFetch = ()=>{
    fetch('https://reqres.in/api/users/2',{
        method:'GET',
        headers:{
            'Access-Control-Allow-Origin':null,
        },
        headers:{
            'Content-Type':'application/json',
        }
    })
    .then((Response)=>Response.json())
    .then((Response)=>console.log(Response))
    .catch((error)=>console.log(error))

}

const createDataUsingFetch = ()=>{
    fetch('https://reqres.in/api/users',{
        method: "POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({name:"hardik",job:'Intern'}),

})
.then((Response)=>Response.json())
.then((Response)=>console.log(Response))
.catch((error)=>console.log(error))

}

const updateDataUsingFetch = ()=>{
    fetch('https://reqres.in/api/users/2',{
        method: 'PUT',
        headers: {
            'Content-Type':'application/josn'
        },
        body:JSON.stringify({name:"hardik",job:'Intern'}),

    })
    .then((Response)=>Response.json())
    .then((Response)=>console.log(Response))
    .catch((error)=>console.log(error))
}

const deleteDataUsingFetch = ()=>{
    fetch('https://reqres.in/api/users/2',{
        method:"DELETE",
        
}).then((Response)=>console.log(Response));
.then((Response)=>Response)
.then((data)=>console.log(data))
.catch((error)=>console.log(error))


}