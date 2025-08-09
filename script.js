//note: for in gets the property itself (so in array, use index returned to access element)
// note: for of gets the actual value stored

//handle input
function input(button,display){
    button.addEventListener("click",()=>{
        let text = button.value;
        if(beenReset){
            display.value = button.value;
            beenReset = false;
        }else{
            display.value += text;
        }  
    });
}

// handle clear
function clear(){
    display.value = "0";
    beenReset = true;
}

const buttons = document.querySelectorAll(".number-button, .operator-button, #decimal-button");
const display = document.querySelector("input");
const clearButton = document.querySelector("#clear-button");

//if calculator has been reset (so it "changes" intial zero value and doesnt add to it)
let beenReset = true;

// to input numbers and operations to calculator display
buttons.forEach((button) =>{
   input(button,display);
});

// create the clear button
clearButton.addEventListener("click",clear);

