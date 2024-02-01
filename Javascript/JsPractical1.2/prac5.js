function combineObjects(obj1, obj2) {
    const combinedObject = {};

    // obj1
    for (let prop in obj1) {
        combinedObject[prop] = obj1[prop];
    }

    // obj2
    for (let prop in obj2) {
        combinedObject[prop] = obj2[prop];
    }

    return combinedObject;
}

// Example usage
const data1 = {
    name: 'Hardik',
    age: 21,

};

const data2 = {
    address: 'bhavnagar',
    email: 'abc@gmail.com'
};

const combinedPerson = combineObjects(data1, data2);

console.log("Person 1:", data1);
console.log("Person 2:", data2);
console.log("Combined Data:", combinedPerson);
