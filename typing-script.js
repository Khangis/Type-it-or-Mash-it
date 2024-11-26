import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const startSpeedButton = document.getElementById("start-speed");
const textBox = document.getElementById("text-box");
const testText = document.getElementById("test-text");
const speedtypeResult = document.getElementById("speedtype-result");

startSpeedButton.disabled = true;
let excerpts = [];

// This function will fetch excerpts from Firestore
export async function fetchExcerpts(db) {
    try {
        const querySnapshot = await getDocs(collection(db, "Excerpts")); // Ensure "Excerpts" is the correct collection name
        console.log("Fetching excerpts...");

        if (querySnapshot.empty) {
            console.log("No excerpts found in the collection.");
            return;
        }

        querySnapshot.forEach((doc) => {
            excerpts.push(doc.data().text);
            console.log("Excerpt fetched: ", doc.data().text);
        });

        startSpeedButton.disabled = false; // Enable the button after excerpts are loaded
    } catch (error) {
        console.error("Error fetching excerpts: ", error);
    }
}

startSpeedButton.addEventListener("click", () => {
    if (excerpts.length === 0) {
        alert("Excerpts not loaded. Please try again.");
        return;
    }

    // Get a random excerpt
    const randomExcerpt = excerpts[Math.floor(Math.random() * excerpts.length)];
    testText.textContent = randomExcerpt; // Display a random excerpt

    textBox.value = "";
    speedtypeResult.textContent = "";
    textBox.focus();

        
    startTime = new Date().getTime(); // Start the timer
});


textBox.addEventListener("input", () => {
    if (textBox.value.trim() === testText.textContent.trim()) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;
        const wordsPerMinute = (testText.textContent.split(" ").length / timeTaken) * 60;

        // This calculates for the Accuracy
        const accuracy = calculateAccuracy(textBox.value, testText.textContent);
        speedtypeResult.textContent = `Finished! You've typed at ${Math.round(wordsPerMinute)} WPM with ${accuracy}% accuracy!`;
        textBox.disabled = true;
    }
});

// The function used to calculate accuracy:
function CalculateAccuracy(userInput, targetText) {
    const userWords = userInput.split("");
    const targetWords = targetText.split("");
    let correctChars = 0; // Starting at 0 correct character typed

    for (let i = 0; i < Math.min(userWords.length, targetWords.length); i++) {
        if (userWords[i] === targetWords[i]) {
            correctChars++;
        }
    }

    return Math.round((correctChars / targetWords.length) * 100);

}