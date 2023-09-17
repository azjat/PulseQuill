let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptions = document.querySelectorAll(".advanced-options");
let formatButtons = document.querySelectorAll(".format");
let alignButtons = document.querySelectorAll(".align");
//let icons = document.querySelectorAll(".format-icon");
let foreColor = document.querySelector("#foreColor");
let textInput = document.querySelector(".text-input");
let colorHex;
let colorRgba;
let colorBtn;
let textOptionsArr = [];

foreColor.value = "#000000";

function hexToRgba(hex, opacity) {
    if (hex.charAt(0) === '#') {
        hex = hex.slice(1);
    }
    if (hex.length !== 6) {
        return null;
    }
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    if (opacity) {
        return `rgba(${r},${g},${b},${opacity})`;
    } else {
        return `rgba(${r},${g},${b},0.3)`;
    }
}

function setColor(){
    colorHex = foreColor.value;
    colorRgba = hexToRgba(colorHex);
    colorBtn = hexToRgba(colorHex, 1);
    document.documentElement.style.setProperty('--rgba-color', colorRgba);
    document.documentElement.style.setProperty('--btn-color', colorBtn);
}

foreColor.addEventListener("change", setColor);

setColor();

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlighted and other would be normal
            if (needsRemoval) {
                let alreadyActive = false;
                //If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                //Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                //if other buttons can be highlighted
                button.classList.toggle("active");
                console.log("normal button clicked");
            }
        });
    });
};

            
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};


const initializer = () => {
    //function calls for highlighting buttons
    //No highlights for link, unlink,lists, undo,redo since they are one time operations
    highlighter(alignButtons, true);
    highlighter(formatButtons, false);

};

const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);

};

optionsButtons.forEach((button) => {
    //! does not work well with align buttons
    //todo make align buttons align entire text if nothing is selected
    
    button.addEventListener("click", () => {
        textInput.focus();

        if (textOptionsArr.includes(button.id)) {
            textOptionsArr.splice(textOptionsArr.indexOf(button.id), 1);
        } else {
            textOptionsArr.push(button.id);
        }

        let keypressed = false;

        textInput.addEventListener("keydown", () => {
            keypressed = true;
            console.log('keydown');
        })

        textInput.addEventListener("focus", () => {
            if (keypressed===false){
                console.log('focus');
                textOptionsArr.forEach((btnClass) =>{
                    modifyText(btnClass, false, null);
                });
            }
        });

        modifyText(button.id, false, null);
        console.log(textOptionsArr);
    });
});

advancedOptions.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

initializer();


