let count = 0;
let energy = 100;
const maxEnergy = 100;
const energyRecoveryRate = 1;
const recoveryInterval = 2000;

const counterDisplay = document.getElementById('counterDisplay');
const energyLevel = document.getElementById('energyLevel');
const energyText = document.getElementById('energyText');
const coinButton = document.getElementById('coinButton');
const upgradeButton = document.getElementById('upgradeButton');

fetchUserData();

// Helper function
function getTimestamp() {
    return Date.now(); // This returns milliseconds since epoch
}

function updateCounter() {
    let clickCount = localStorage.getItem('clickCount');
    if (clickCount) {
        counterDisplay.innerText = Math.floor(parseFloat(clickCount));
    }
}

// Function to add coins every X milliseconds
function addCoins() {
    let hasAutoClicker = localStorage.getItem('hasAutoClicker');
    if (hasAutoClicker === 'true') {
        let currentClickCount = parseFloat(localStorage.getItem('clickCount')) || 0;

        // Get the upgrade level for Click Booster
        let clickBoosterLevel = parseInt(localStorage.getItem('upgradeLevel')) || 0;

        // Auto Clicker gives clicks equal to the Click Booster level
        currentClickCount += clickBoosterLevel + 1;

        localStorage.setItem('clickCount', currentClickCount);
        updateCounter();
    }
}

// When the script loads, take any amount that already exists.
if (localStorage.getItem('clickCount')) {
    count = parseFloat(localStorage.getItem('clickCount')); // Parse to integer
    updateCounter();
} else {
    // Set the value
    localStorage.setItem('clickCount', count);
}

coinButton.addEventListener('click', () => {
    if (energy > 0) {
        let upgradeLevel = localStorage.getItem('upgradeLevel') || 0;
        let increment = parseInt(upgradeLevel) + 1;

        // Get current clicks from localStorage
        let currentClicks = parseFloat(localStorage.getItem('clickCount')) || 0;

        // Increment clicks
        currentClicks += increment;

        localStorage.setItem('clickCount', currentClicks);

        updateCounter();

        energy -= 1;
        energyLevel.style.width = energy + '%';
        energyText.textContent = energy;
    } else {
        alert("Энергия исчерпана!");
    }
});

function recoverEnergy() {
    if (energy < maxEnergy) {
        energy += energyRecoveryRate;
        if (energy > maxEnergy) {
            energy += energyRecoveryRate;
        }
        energyLevel.style.width = energy + '%';
        energyText.textContent = energy;
    }
}

setInterval(recoverEnergy, recoveryInterval);

upgradeButton.addEventListener('click', () => {
    window.location.href = "upgrade.html";
});

// Set interval to add coins automatically every second
setInterval(addCoins, 1000);

window.addEventListener("beforeunload", (event) => {
    // Call the saveProgress function
    saveProgress();
  
    // Optionally, you can show a confirmation dialog
    event.preventDefault(); // For most browsers
    event.returnValue = ''; // For Chrome
  });
