function updateMainContainerSize() {
    let screenHeightInPixels = window.innerHeight;
    let screenWidthInPixels = window.innerWidth;
    let heightInEm = screenHeightInPixels / 16;
    let widthInEm = screenWidthInPixels / 16;
    const mainContainer = document.querySelector(".main-container");
    mainContainer.style.height = (0.8 * heightInEm) + "em";
    mainContainer.style.width = (0.8 * widthInEm) + "em";
}
updateMainContainerSize();
window.addEventListener("resize", updateMainContainerSize);