//note: for in gets the property itself (so in array, use index returned to access element)
// note: for of gets the actual value stored

//next steps:
//get the total string and split based on +,*,/ and - signs


//Calculator class to hold all variables,functions and operations
//to execute on calculator 
class Calculator {
    static OPERATORS = ["+", "-", "x", "/","."];

    constructor(buttons,display,clearButton,equalButton) {

        this.beenReset = true;
        this.finalCalculation = 0;
        this.operations = [];
        
        // keep track of operations
        this.currentOperation = "";
        this.lastOperation = "";

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

            //to hold current operator value
            this.currentOperation = button.value;
            //if last input was operator and attempt to enter another, do not allow
            if(this.wasOperator(this.lastOperation,this.currentOperation)){
                return;
            }

            let text = button.value;
            if(this.beenReset){
                this.display.value = text;
                this.beenReset = false;
            }else{
                this.display.value += text;
            }
            // current operation now becomes last operation
            this.lastOperation = this.currentOperation;

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
        this.lastOperation = "";
    }

    wasOperator(lastValue,firstValue){
        return Calculator.OPERATORS.includes(lastValue) && Calculator.OPERATORS.includes(firstValue);
    }

    // NEXT STEP: Operators!


    // compute(){

    // }


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