let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptions = document.querySelectorAll(".advanced-options");
let formatButtons = document.querySelectorAll(".format");
let alignButtons = document.querySelectorAll(".align");
let foreColor = document.querySelector("#foreColor");
let textInput = document.querySelector(".text-input");
let notesContainer = document.querySelector(".notes-container");
let fontSizeRef = document.getElementById("fontSize");
let colorHex;
let colorRgba;
let colorBtn;

function saveToLocalStorage() {
    localStorage.setItem('textContents', textInput.innerHTML);
}

function loadFromLocalStorage() {
    const savedText = localStorage.getItem('textContents');
    if (savedText) {
        textInput.innerHTML = savedText;
    }
}

textInput.addEventListener('input', saveToLocalStorage);

if (localStorage.getItem('textContents')) {
    loadFromLocalStorage();
}

//todo make it so after refreshing the page when you start typing it does it in another element (currently it does it in the first one so the effects from the first one are still there)

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
    highlighter(alignButtons, true);
    highlighter(formatButtons, false);

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
      }
      fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);

};

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
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
            }
        });
    });
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        textInput.focus();
        modifyText(button.id, false, null);
    });
});

document.addEventListener('click', function (event) {
    const withinBoundaries = event.composedPath().includes(notesContainer);
    if (!withinBoundaries) {
        fontSizeRef.value = 3;
        optionsButtons.forEach((button) => {
            if (button.classList.contains("active") && !button.classList.contains("align")) {
                button.classList.remove("active");
                textInput.addEventListener("focus", () => {
                    document.execCommand("foreColor", false, colorHex);
                    modifyText(button.id, false, null);
                    modifyText("fontSize", false, 3);
                }, { once: true });
            } else {
                textInput.addEventListener("focus", () => {
                    document.execCommand("foreColor", false, colorHex);
                    modifyText("fontSize", false, 3);
                }, { once: true });
            }
        });
    }
});

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

