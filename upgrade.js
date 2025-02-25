// Helper function
function getTimestamp() {
    return Date.now(); // This returns milliseconds since epoch
}

// Function to handle card upgrades
function getUpgradeCost() {
    let upgradeLevel = localStorage.getItem('upgradeLevel') || 0;
    upgradeLevel = parseInt(upgradeLevel);
    // Increase the upgradeLevel by 10% each time
    const cost = 5 * Math.pow(2.50, upgradeLevel);

    return parseInt(cost);
}

// Auto Clicker card
function getAutoClickerCost() {
    return 20;
}

// Back to game button functionality
document.getElementById("miningButton").addEventListener("click", function() {
    window.location.href = "index.html";
});
function updateUpgradeView() {
    document.getElementById("currentClicks").innerText = Math.floor(parseFloat(localStorage.getItem('clickCount')));
}

// Function to handle card upgrades
function upgradeCard(cardId) {
    // Set default value of Upgrade Level
    if (!localStorage.getItem('upgradeLevel')) {
        localStorage.setItem('upgradeLevel', 0);
    }

    let currentClicks = localStorage.getItem('clickCount');
    if (!currentClicks || currentClicks < 0) {
        currentClicks = 0;
    }
    currentClicks = parseInt(currentClicks);

    const upgradeCost = getUpgradeCost();

    if (currentClicks >= upgradeCost) {
        currentClicks -= upgradeCost;
        localStorage.setItem('clickCount', currentClicks);

        // Get current upgrade level
        let upgradeLevel = localStorage.getItem('upgradeLevel') || 0; // Default to 0 if not set
        upgradeLevel++;
        localStorage.setItem('upgradeLevel', upgradeLevel);

        const newUpgradeCost = getUpgradeCost();

        // Update the current cost on display
        displayCurrentCost(newUpgradeCost);

        // Update display
        updateUpgradeView();
        displayCurrentBonus(upgradeLevel + 1);

        console.log("Card " + cardId + " upgraded! New upgrade level: " + upgradeLevel);
    } else {
        alert("Not enough clicks to upgrade! (Need " + upgradeCost + ")");
    }
}

function purchaseAutoClicker() {
    let currentClicks = localStorage.getItem('clickCount');
    if (!currentClicks || currentClicks < 0) {
        currentClicks = 0;
    }
    currentClicks = parseInt(currentClicks);

    let autoClickerCost = getAutoClickerCost();

    if (currentClicks >= autoClickerCost) {
        currentClicks -= autoClickerCost;
        localStorage.setItem('clickCount', currentClicks);

        // Set a flag to indicate the auto-clicker is purchased
        localStorage.setItem('hasAutoClicker', 'true');

        // Disable the button
        const autoClickerButton = document.querySelector('button[onclick="purchaseAutoClicker()"]');
        autoClickerButton.disabled = true;
        autoClickerButton.innerText = "Purchased";

        updateUpgradeView();
    } else {
        alert("Not enough clicks to purchase Auto Clicker!");
    }
}

function displayCurrentCost(upgradeCost) {
    document.getElementById("upgradeCostDisplay").innerText = upgradeCost;
}

function displayCurrentBonus(currentBonus) {
    document.getElementById("currentBonus").innerText = currentBonus;
}

// Set the initial values
function initialValues() {
    displayCurrentCost(getUpgradeCost());
    updateUpgradeView();
    document.getElementById("currentBonus").innerText = (parseInt(localStorage.getItem('upgradeLevel')) || 0) + 1;
    document.getElementById("autoClickerCost").innerText = getAutoClickerCost();
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
        updateUpgradeView();
    }
}

//Add coins on load
addCoins();

//Is the button bought or not?
if (localStorage.getItem('hasAutoClicker') === 'true') {
    const autoClickerButton = document.querySelector('button[onclick="purchaseAutoClicker()"]');
    autoClickerButton.disabled = true;
    autoClickerButton.innerText = "Purchased";
}

//Initial values
initialValues();

//Update every X time
setInterval(addCoins, 1000);

