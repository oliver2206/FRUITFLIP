let heartLife = localStorage.getItem('heartLife') ? parseInt(localStorage.getItem('heartLife')) : 3; // Initialize with 3 heart lives from localStorage
let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 100;

function updateCoinDisplay() {
    document.getElementById('coinCount').textContent = coins;
    localStorage.setItem('coins', coins);
}

function updateHeartLifeDisplay() {
    document.getElementById('heartLifeCount').textContent = heartLife;
    localStorage.setItem('heartLife', heartLife); // Save heart life to localStorage
}

// Deduct 1 heart when the "Exit" button is clicked
const exitLink = document.getElementById('exitLink');
exitLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default behavior (e.g., navigating away immediately)
    
    if (heartLife > 0) {
        heartLife--; // Deduct 1 heart
        updateHeartLifeDisplay();
        alert("One heart deducted!");

        // Navigate to TILEHOMEPAGE.html after deduction
        window.location.href = "TILEHOMEPAGE.html";  // Redirect to TILEHOMEPAGE.html
    } else {
        alert("You have no hearts left!");
    }
});

// Function to add 1 heart every 5 minutes
function addHeartLifeEveryFiveMinutes() {
    setInterval(() => {
        if (heartLife < 5) { // Max heart life = 5
            heartLife++;
            updateHeartLifeDisplay();
        }
    }, 300000); // 300,000 milliseconds = 5 minutes
}

// Call the function to start adding heart life every 5 minutes
addHeartLifeEveryFiveMinutes();

// Initialize display
updateHeartLifeDisplay();
updateCoinDisplay();

let heartLife = 3; // Initialize with 3 heart lives
let coins = localStorage.getItem('coins') ? parseInt(localStorage.getItem('coins')) : 100;

function updateCoinDisplay() {
    document.getElementById('coinCount').textContent = coins;
    localStorage.setItem('coins', coins);
}

function updateHeartLifeDisplay() {
    document.getElementById('heartLifeCount').textContent = heartLife;
}

// Deduct 1 heart when the "Exit" button is clicked
const exitLink = document.getElementById('exitLink');
exitLink.addEventListener('click', () => {
    if (heartLife > 0) {
        heartLife--; // Deduct 1 heart
        updateHeartLifeDisplay();
        alert("One heart deducted!");
    } else {
        alert("You have no hearts left!");
    }
});

// Function to add 1 heart every 5 minutes
function addHeartLifeEveryFiveMinutes() {
    setInterval(() => {
        if (heartLife < 5) { // Max heart life = 5
            heartLife++;
            updateHeartLifeDisplay();
        }
    }, 300000); // 300,000 milliseconds = 5 minutes
}

// Call the function to start adding heart life every 5 minutes
addHeartLifeEveryFiveMinutes();

// Initialize display
updateHeartLifeDisplay();
updateCoinDisplay();

