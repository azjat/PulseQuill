let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptions = document.querySelectorAll(".advanced-options");
let formatButtons = document.querySelectorAll(".format");
let alignButtons = document.querySelectorAll(".align");

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            //needsRemoval = true means only one button should be highlight and other would be normal
            if (needsRemoval) {
                let alreadyActive = false;
                console.log(button.classList);
                //If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                    console.log("already active");
                }
                //Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    //highlight clicked button
                    console.log("not active, added class");
                    button.classList.add("active");
                }
            } else {
                //if other buttons can be highlighted
                button.classList.toggle("active");
                console.log("else");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
        console.log("removed the active class");
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
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
        console.log(button.id);
    });
});

advancedOptions.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});


initializer();