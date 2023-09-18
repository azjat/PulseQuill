let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptions = document.querySelectorAll(".advanced-options");
let formatButtons = document.querySelectorAll(".format");
let alignButtons = document.querySelectorAll(".align");
let foreColor = document.querySelector("#foreColor");
let textInput = document.querySelector(".text-input");
let colorHex;
let colorRgba;
let colorBtn;


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

function setColor() {
    colorHex = foreColor.value;
    colorRgba = hexToRgba(colorHex);
    colorBtn = hexToRgba(colorHex, 1);
    document.documentElement.style.setProperty('--rgba-color', colorRgba);
    document.documentElement.style.setProperty('--btn-color', colorBtn);
}

foreColor.addEventListener("change", setColor);

setColor();
const initializer = () => {
    //* function calls for highlighting buttons
    //* No highlights for link, unlink,lists, undo,redo since they are one time operations
    highlighter(alignButtons, true);
    highlighter(formatButtons, false);

};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);

};


//! Every second focus the effects stop working
//todo fix the above bug

textInput.addEventListener("focus", () => {
    console.log("focus");
    optionsButtons.forEach((button) => {
        if (button.classList.contains("active")) {
            console.log(button);
            modifyText(button.id, false, null);
        }
    });
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                highlighterRemover(className);
                button.classList.add("active");
            } else {
                //* code here applies to optionsButtons
                button.classList.toggle("active");
                console.log(`${button.id} button clicked`);
                textInput.focus();
            }
        });
    });
};


const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

advancedOptions.forEach((button) => {
    button.addEventListener("change", () => {
        textInput.focus();
        modifyText(button.id, false, button.value);
    });
});


initializer();