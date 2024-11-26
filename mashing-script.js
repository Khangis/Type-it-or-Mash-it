const startMashingButton = document.getElementById("start-mashing");
const keyCount = document.getElementById("key-count");
const mashingResult = document.getElementById("mashing-result");
const timeLimitInput = document.getElementById("time-limit");

let keyPressCount = 0; 

startMashingButton.addEventListener("click", () => {
    keyPressCount = 0; // Number of key pressed starts at 0.
    keyCount.textContent = `Keys Pressed: ${keyPressCount}`;
    mashingResult.textContent = "";

    const timeLimit =  parseInt(timeLimitInput.value) || 10;

    document.addEventListener("keydown", countKeys); // Start counting keys pressed

    setTimeout(() => {
        document.removeEventListener("keydown", countKeys); // Stop counting keys pressed
        mashingResult.textContent = `You mashed ${keyPressCount} keys in ${timeLimit} seconds`;
    }, timeLimit * 1000); // Convert seconds into milliseconds
});

function countKeys() {
    keyPressCount++;
    keyCount.textContent = `Keys Pressed: ${keyPressCount}`;
}

