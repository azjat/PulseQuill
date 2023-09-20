function updateMainContainerSize() {
    let screenHeightInPixels = window.innerHeight;
    let screenWidthInPixels = window.innerWidth;
    let heightInEm = screenHeightInPixels / 16;
    let widthInEm = screenWidthInPixels / 16;
    const mainContainer = document.querySelector(".main-container");
    const searchBar = document.querySelector(".i");

    mainContainer.style.height = (0.8 * heightInEm) + "em";
    mainContainer.style.width = (0.8 * widthInEm) + "em";
    searchBar.style.width = (0.8 * widthInEm) + "em";

}

updateMainContainerSize();
window.addEventListener("resize", updateMainContainerSize);

let addButton = document.querySelector(".todo-add");
let addButtonIcon = document.querySelector(".todo-add-icon");
addButton.addEventListener("mouseenter", function (event) {
    addButtonIcon.classList.add("todo-add-hover");
});
addButton.addEventListener("mouseleave", function (event) {
    addButtonIcon.classList.remove("todo-add-hover");
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    });
}

const mainContainer = document.querySelector(".main-container");
mainContainer.addEventListener("click", function (event) {
    scrollToBottom();
});

const searchBar = document.querySelector(".i");
searchBar.addEventListener("click", function (event) {
    scrollToTop();
});