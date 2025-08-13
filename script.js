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
        
        this.inputs = [];
        this.numbers = [];

        this.currentOperator = null;
        this.wasOperator = false;

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
            if(this.inputs.includes(".") && button.value === "."){
            return;
            }
      
            if(this.beenReset || this.wasOperator){
                this.display.value = button.value;
                this.beenReset = false;
                this.wasOperator = false;
                this.inputs.push(button.value);
                return;
            }else{
                this.display.value += button.value;  
                this.inputs.push(button.value);
            }
            
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
        this.clearInputArr();
        this.clearNumberArr();
    }

    operatorInput(){
        this.operatorButtons.forEach((button)=>{
            this.handleOperatorInput(button);
        });
    }

    handleOperatorInput(button){
        button.addEventListener("click",()=>{
            this.wasOperator = true;

            this.currentOperator = button.value;
            this.display.value = this.currentOperator;
            this.numbers.push(this.inputs.join(""));
            this.clearInputArr();

            console.log(this.numbers);
        });
    }

    handleEquals(){
        this.equalButton.addEventListener("click",() =>{
            if(this.numbers.length < 2){
                return;
            }

            //call calculation based on current operand
            this.compute();
            
        })
    }

    compute(){
        if(this.currentOperator === "+"){
            this.sum();
        }else if(this.currentOperator === "-"){

        }else if(this.currentOperator === "x"){
            
        }else if(this.currentOperator === "/"){
            
        }
    }
    clearInputArr(){
        // for(let i = 0; i < this.inputs.length; i++){
        //     this.inputs.pop();
        // }

        this.inputs = [];
    }
    clearNumberArr(){
        // for(let i = 0; i < this.numbers.length; i++){
        //     this.numbers.pop();
        // }
        this.numbers = [];

    }

    sum(){
        this.calculation = this.numbers
        .map(num => Number(num))
        .reduce((accumulator,currentValue) =>{
            return accumulator + currentValue;
        },this.calculation);
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