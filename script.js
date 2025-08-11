//note: for in gets the property itself (so in array, use index returned to access element)
// note: for of gets the actual value stored

//next steps:
//get the total string and split based on +,*,/ and - signs


//Calculator class to hold all variables,functions and operations
//to execute on calculator 
class Calculator {
    static OPERATORS = ["+", "-", "x", "/"];

    // constructor for the calculator class
    constructor(buttons,display,clearButton,equalButton) {

        //to check if calculator has been cleared or reset
        this.beenReset = true;
        //to compute 
        this.finalCalculation = 0;
        //hold inputs
        let inputArr = [];
        
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
            //do not allow multiple operators to be input, if so, replace last operator with current
            if(this.lastInputWasOperator(this.lastOperation,this.currentOperation)){
                this.display.value = this.replaceOperator(this.lastOperation, this.currentOperation);
                this.lastOperation = this.currentOperation;
                return;
            }

            
            let text = button.value;
            if(this.beenReset){
                if(this.isNumeric(text)){
                    this.display.value = text;
                }else{
                    this.display.value += text;
                }
                this.beenReset = false;
            }else{
                this.display.value += text;
            }

            // current operation now becomes last operation
            this.lastOperation = this.currentOperation;

        });
    }

    // to clear calculator
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

    isNumeric(value){
        return !isNaN(Number(value));
    }

    lastInputWasOperator(lastValue,firstValue){
        //if "." is pressed twice in a row, return true
        if(lastValue === "." && firstValue === "."){
            return true;
        }
        return (Calculator.OPERATORS.includes(lastValue) && Calculator.OPERATORS.includes(firstValue));

    }

    replaceOperator(lastOperation,currentOperation){
        let replacementText = this.display.value;
        let lastOccurrence = replacementText.lastIndexOf(lastOperation);
        replacementText = replacementText.substring(0,lastOccurrence) + currentOperation;
        return replacementText;
    }

    compute(){


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