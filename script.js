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

        //hold inputs
        this.inputs = [];
        
        //to check if calculator has been cleared or reset
        this.beenReset = true;

        //to compute 
        this.calculation = 0;  

        //hold operands
        this.firstOperand = null;
        this.secondOperand = null;

        //to hold currentOperator
        this.currentOperator = null;

        //to indicate if number was entered
        this.numberEntered = false;
        this.operatorEntered = false; 
       

    }

    //-----start program------
    start(){
        this.numberInput();
        this.clearInput();
        this.operatorInput();
    }

     //--------to clear input--------
    clearInput(){
        this.clearButton.addEventListener("click",() =>{
            this.handleClearInput();
        });
    }

    handleClearInput(){
        this.display.value = "0";
        this.beenReset = true;
        this.calculation = 0;
        this.inputs = [];
        this.currentOperator = null;
        this.numberEntered = false;
        this.operatorEntered = false;
        this.firstOperand = null;
        this.secondOperand = null;
    }

    //-------for number input-------
    numberInput(){
        this.numberButtons.forEach((button) =>{
            this.handleNumberInput(button);
        })
    }
    handleNumberInput(button){
        button.addEventListener("click",()=>{
            this.numberEntered = true;

            if(this.beenReset){
                this.display.value = button.value;
                this.beenReset = false;
                this.appendValue(button.value);
                return;
            }
            //if decimal already present and user enters another decimal
            if(this.containsDecimal(button.value)){
                return;
            }

            if(this.operatorEntered){
                this.display.value = button.value;
                this.appendValue(button.value);
                this.operatorEntered = false;
                return;
            }

            this.display.value += button.value;
            this.appendValue(button.value);
        });
    }

    //-------for operator input-------
    operatorInput(){
      this.operatorButtons.forEach((button)=>{
        this.handleOperatorInput(button);
      })

    }

    handleOperatorInput(button){
        button.addEventListener("click",() =>{
            // if no number entered, and operator isnt "-" 
            if(!this.numberEntered && button.value !== "-"){
                return;
            }else if(!this.numberEntered && button.value === "-"){
                this.display.value = button.value;
                this.beenReset = false;
                return;
            }

            this.setOperands();
            console.log(this.secondOperand);
            this.display.value = button.value;
            this.currentOperator = button.value;
            this.operatorEntered = true;
            this.inputs = [];
        });

    }

    //-------for equal input-------
    equalInput(){
        this.equalButton.addEventListener("click",() =>{
            this.handleClearInput();
        })
    }

    handleEqualInput(){

    }





    //to check if decimal is already present in array of inputs
    containsDecimal(value){
        if(this.display.value.includes(".") && value === "."){
            return true;
        }else{
            return false;
        }
    }

    //to append input value to array (useful to join string and create number)
    appendValue(value){
        this.inputs.push(value);
        console.log(this.inputs);
    }


    setOperands(){
        if(this.firstOperand === null){
            this.firstOperand = Number(this.display.value);
        }else if(this.secondOperand === null){
            this.secondOperand = Number(this.display.value);
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