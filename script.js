//note: for in gets the property itself (so in array, use index returned to access element)
// note: for of gets the actual value stored

//next steps:
//get the total string and split based on +,*,/ and - signs


//Calculator class to hold all variables,functions and operations
//to execute on calculator 
class Calculator {
    static OPERATORS = ["+", "-", "x", "/"];

    // constructor for the calculator class
    constructor(numberButtons,operatorButtons,equalButton,clearButton,display) {

         // references to the nodes
        this.numberButtons = numberButtons;
        this.operatorButtons = operatorButtons;
        this.equalButton = equalButton;
        this.clearButton = clearButton;
        this.display = display;
        
        //to check if calculator has been cleared or reset
        this.beenReset = true;

        //to compute 
        this.calculation = 0;   

        //hold inputs
        this.inputs = [];

        //hold operands for doing actual calculation
        this.operands = [];
    }

    start(){
        this.numberInput();
        this.clearInput();
        this.operatorInput();

    }

    //for number input
    numberInput(){
        this.numberButtons.forEach((button) =>{
            this.handleNumberInput(button);
        })
    }
    handleNumberInput(button){
        button.addEventListener("click",()=>{
            this.updateDisplay(button.value);
        })
    }

    //for operator input
    operatorInput(){
        this.operatorButtons.forEach(button =>{
            this.handleOperatorInput(button);
        })
    }

    handleOperatorInput(button){
        button.addEventListener("click",()=>{
            //join number inputs into one and push to operand
            this.operands.push(this.inputs.join(""));
            this.operands.push(button.value);
            //set display to the current operand
            this.display.value = button.value;
            console.log(this.operands);

        });
    }

    //clear input
    clearInput(){
        this.clearButton.addEventListener("click",() =>{
            this.handleClearInput();
        });
    }

    handleClearInput(){
        this.display.value = "0";
        this.beenReset = true;
    }

    // to update the display
    updateDisplay(value){
        if(this.inputs.includes(value) && value === "."){
            return;
        }
        
        if(this.beenReset){
            this.display.value = value;
            this.beenReset = false;
            this.inputs.push(value);
            return;
        }else{
            this.display.value += value;  
            this.inputs.push(value);
        }
    }

}


function main(){

    const numberButtons = document.querySelectorAll(".number-button,#decimal-button");
    const operatorButtons = document.querySelectorAll(".operator-button");
    const equalButton = document.querySelector("#equal-operator");
    const display = document.querySelector("input");
    const clearButton = document.querySelector("#clear-button");

    const calculator = new Calculator(numberButtons,operatorButtons,equalButton,clearButton,display);

    calculator.start();
}

main();