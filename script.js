//note: for in gets the property itself (so in array, use index returned to access element)
// note: for of gets the actual value stored

//handle input
// function input(button,display){
//     button.addEventListener("click",()=>{
//         let text = button.value;
//         if(beenReset){
//             display.value = button.value;
//             beenReset = false;
//         }else{
//             display.value += text;
//         }  
//     });
// }

// // handle clear
// function clear(){
//     display.value = "0";
//     beenReset = true;
//     finalCalculation = 0;
// }

// // operation functions
// function sum(num){
//     finalCalculation += num;
// }

// function subtract(num){
//     finalCalculation -= num;
// }

// function mulitply(num){
//     finalCalculation *= num;
// }

// function divide(num){
//     finalCalculation /= num;
// }


// const buttons = document.querySelectorAll(".number-button, .operator-button, #decimal-button");
// const display = document.querySelector("input");
// const clearButton = document.querySelector("#clear-button");
// const equalButton = document.querySelector("#equal-operator");

// //operations array to hold all operations
// let operations = [];
// //if calculator has been reset (so it "changes" intial zero value and doesnt add to it)
// let beenReset = true;

// //final calculation
// let finalCalculation = 0;

// // to input numbers and operations to calculator display
// buttons.forEach((button) =>{
//    input(button,display);
// });

// // create the clear button
// clearButton.addEventListener("click",clear);


class Calculator {
    constructor(buttons,display,clearButton,equalButton) {
        this.beenReset = true;
        this.finalCalculation = 0;
        this.operations = [];

        // references to the nodes
        this.buttons = buttons;
        this.display = display;
        this.clearButton = clearButton;
        this.equalButton = equalButton;
    }

    start(){
        this.input();
        this.clear();
    }

    input(){
        this.buttons.forEach((button) => {
            this.handleInput(button);
        });
    }
    handleInput(button){
        button.addEventListener("click",()=>{
            let text = button.value;
            if(this.beenReset){
                this.display.value = text;
                this.beenReset = false;
            }else{
                this.display.value += text;
            }
        });
    }

    clear(){
        this.clearButton.addEventListener("click",() =>{
            this.handleClear(this.display);
        });
    }

    handleClear(display){
        display.value = "0";
        this.finalCalculation = 0;
        this.beenReset = true;
    }
}

function main(){

    const buttons = document.querySelectorAll(".number-button, .operator-button, #decimal-button");
    const display = document.querySelector("input");
    const clearButton = document.querySelector("#clear-button");
    const equalButton = document.querySelector("#equal-operator");

    const calculator = new Calculator(buttons,display,clearButton,equalButton);

    calculator.start();
}

main();