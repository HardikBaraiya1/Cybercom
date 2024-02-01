
function extract(original, neededProps) {
    const extractedObject = {};

    neededProps.forEach(property => {
        if (original[property] !== undefined) {
            extractedObject[property] = original[property];
        }
    });

    return extractedObject;
}

// Example usage
const person = {
    name: 'Hardik',
    age: 21,
    address: 'bhavnagar',
    email: 'abc@gmail.com'
};

const extractedInfo = extract(person, ["name", "email"]);

console.log("Original Object:", person);
console.log("Extracted Object:", extractedInfo);
