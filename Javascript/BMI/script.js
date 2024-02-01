function calculateBMI() {
    var heightInput = document.getElementById("height");
    var weightInput = document.getElementById("weight");
    var resultDiv = document.getElementById("result");

    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        if(isNaN(height) || isNaN(weight))
        resultDiv.innerHTML = "height and weight can not be Empty.";
        else
        resultDiv.innerHTML = "Please enter valid height and weight.";
        resultDiv.style.color = "red";
        return;
    }

    var bmi = weight / (height * height);
    var category = getBMICategory(bmi);

    resultDiv.innerHTML = `Your BMI: ${bmi.toFixed(2)} (${category})`;
    resultDiv.style.color = getCategoryColor(category);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
}

function getCategoryColor(category) {
    switch (category) {
        case "Underweight":
            return "blue"; 
        case "Normal weight":
            return "green";
        case "Overweight":
            return "orange"; 
        case "Obese":
            return "red"; 
        default:
            return "black"; 
    }
}
