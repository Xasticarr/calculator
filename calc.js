let operator = "";
let previousValue = "";
let currentValue = "";
let currentValue2 = ""; //was operateValue
let previousValue2 = ""; //was displayValue

document.addEventListener("DOMContentLoaded", function() {
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    let lastOperator = "";

    numbers.forEach((number) => number.addEventListener("click", function(e) {
        if (previousValue === currentValue && lastOperator === "=") {
            console.log("This is starting a new operation")
            currentValue = "";
            previousValue = "";
            lastOperator = "";
            console.log(e.target.textContent);
            currentScreen.textContent = currentValue;
        }
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))

    operators.forEach((op) => op.addEventListener("click", function(e) {
        // console.log(previousValue + " previousValue");
        // console.log(currentValue + " currentValue");
        // console.log("Hitting in operators");
        lastOperator = e.target.textContent;
        if (currentValue !== "" && previousValue !== "" && previousValue2 !== currentValue){
            operate()
        };
        handleOperator(e.target.textContent);
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))

    clear.addEventListener("click", function(){
        previousValue = "";
        currentValue = "";
        operator = "";
        lastOperator = "";
        previousValue2 = "";
        currentValue2 = "";
        previousScreen.textContent = previousValue;
        currentScreen.textContent = currentValue;

    })

    equal.addEventListener("click" , function() {
        lastOperator = "=";
        if (currentValue != "" && previousValue != ""){
            operate()
            previousScreen.textContent = "";
            if (previousValue.length <= 9){
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0,9) + "...";
            }
            //Want equal to clear currentValue and move currentValue to previousValue
        }
        previousValue = currentValue;
        previousValue2 = currentValue;
        console.log(previousValue + "is previousValue EQUAL");
        console.log(previousValue2 + "is previousValue2 EQUAL");
        console.log(currentValue + "is currentValue EQUAL");

    })

    decimal.addEventListener("click", function() {
        addDecimal();
    })  
})

function handleNumber(num){
    if (currentValue.length <= 9){
       currentValue += num;
    }


}

function handleOperator(op){
    operator = op;
    previousValue = currentValue;
    // currentValue2 = previousValue;
    // if (currentValue === 0 || ""){
    //     previousValue2 = "";
    // } else {
    //     previousValue2 = currentValue;
    // }
    currentValue = "";
    // currentValue = previousValue2;
    // console.log(previousValue + "This is previous OP");
    // console.log(currentValue + " This is current OP")
    // console.log(previousValue2 + " This is previousValue2 OP")
    // console.log(currentValue2 + " This is currentValue2 OP")
}

function operate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    if (previousValue2 !== 0 || "") {
        previousValue2 = previousValue
    };           

    if (operator === "+") {
        previousValue += currentValue;
    } else if (operator === "-") {
        previousValue -= currentValue;
    } else if (operator === "x") {
        previousValue *= currentValue;
    } else if (operator === "/" && currentValue == 0){
        alert("You can't divide by 0, silly!")
    } else {
        previousValue /= currentValue;
    };

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
    currentValue = previousValue;
    // previousValue2 = 
    // want current value to also become previousValue2 for operating, and to clear display after equal is pressed

    console.log(currentValue + "  is Current");
    console.log(previousValue + "  is Previous");

}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += ".";
    }
}