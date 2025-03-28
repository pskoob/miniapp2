
// Helper function
function getTimestamp() {
    return Date.now(); // This returns milliseconds since epoch
}
// FetchUserData()
// Function to handle card upgrades
function getUpgradeCost() {
    let upgradeLevel = localStorage.getItem('upgradeLevel') || 0;
    upgradeLevel = parseInt(upgradeLevel);
    // Increase the upgradeLevel by 10% each time
    const cost = 5 * Math.pow(2.50, upgradeLevel);

    return parseInt(cost);
}

function getUpgradeEnergyCost(){
    let upgradeEnergy = localStorage.getItem('upgradeEnergy') || 0;
    console.log("Значение апгрейда из localStorage:", upgradeEnergy);
    upgradeEnergy = parseInt(upgradeEnergy);
    console.log("upgradeEnergy после parseInt =", upgradeEnergy);

    // if (isNaN(upgradeEnergy)) {
    //     console.warn("upgradeEnergy не является числом, устанавливаем значение по умолчанию 0");
    //     localStorage.setItem('upgradeEnergy', '0');
    //     upgradeEnergy = 0;
    //     console.log("upgradeEnergy установлен в 0");
    //     return 0;
    // }

    const costEnergy = 5 * Math.pow(2.50, upgradeEnergy);

    return parseInt(costEnergy, 10);
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
function displayCurrentEnergyCost(costEnergy) {
    document.getElementById("upgradeCostEnergyDisplay").innerText = costEnergy;
}
function displayCurrentEnergyBonus(bonus) {
    document.getElementById("currentEnergyBonus").innerText = bonus;
}
// Function to handle card upgrades
function upgradeCard(cardId) {
    if (cardId === 'card3') { // Check if we are upgrading the energy card

        // Set default value of Energy Upgrade Level (or create if doesn't exist)
        let energyUpgradeLevel = parseInt(localStorage.getItem('energyUpgradeLevel') || 0);
        // Get current clicks from localStorage
        let currentClicks = parseInt(localStorage.getItem('clickCount') || 0);
        // Get the upgrade cost
        const upgradeEnergyCost = getUpgradeEnergyCost();

        if (currentClicks >= upgradeEnergyCost) {

            // Deduct clicks
            currentClicks -= upgradeEnergyCost;
            localStorage.setItem('clickCount', currentClicks);

            // Increment energy upgrade level
            energyUpgradeLevel++;
            localStorage.setItem('energyUpgradeLevel', energyUpgradeLevel);

            // Update upgradeEnergy (you might not need this)
            let upgradeEnergy = parseInt(localStorage.getItem('upgradeEnergy') || 0); // Get existing value
            upgradeEnergy += 1;
            localStorage.setItem('upgradeEnergy', upgradeEnergy);
            console.log("После апгрейда, upgradeEnergy =", upgradeEnergy);

            // Update display for energy card
            displayCurrentEnergyCost(getUpgradeEnergyCost());
            displayCurrentEnergyBonus(energyUpgradeLevel + 1); // Assuming you have this function

            // Display current clicks
            updateUpgradeView();

            console.log("Energy Card upgraded! New level: " + energyUpgradeLevel);
            saveProgress();

        } else {
            alert("Not enough clicks to upgrade Energy! (Need " + upgradeEnergyCost + ")");
        }
    } else { // This is for the Power Click card
        // Set default value of Upgrade Level
        if (!localStorage.getItem('upgradeLevel')) {
            localStorage.setItem('upgradeLevel', 0);
        }

        let currentClicks = parseInt(localStorage.getItem('clickCount') || 0);
        const upgradeCost = getUpgradeCost();

        if (currentClicks >= upgradeCost) {
            currentClicks -= upgradeCost;
            localStorage.setItem('clickCount', currentClicks);

            // Get current upgrade level
            let upgradeLevel = parseInt(localStorage.getItem('upgradeLevel') || 0); // Default to 0 if not set
            upgradeLevel++;
            localStorage.setItem('upgradeLevel', upgradeLevel);

            // Update the current cost on display
            displayCurrentCost(getUpgradeCost());

            // Update display
            updateUpgradeView();
            displayCurrentBonus(upgradeLevel + 1);

            console.log("Card " + cardId + " upgraded! New upgrade level: " + upgradeLevel);
            saveProgress();
        } else {
            alert("Not enough clicks to upgrade! (Need " + upgradeCost + ")");
        }
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
        // autoClickerButton.innerText = "Purchased";
        saveProgress()
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

    // Добавляем инициализацию для upgradeEnergy
    let energyUpgradeLevel = parseInt(localStorage.getItem('energyUpgradeLevel')) || 0;
    document.getElementById("currentEnergyBonus").innerText = energyUpgradeLevel + 1;
    displayCurrentEnergyCost(getUpgradeEnergyCost()); // Display initial energy upgrade cost
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
    // autoClickerButton.innerText = "Purchased"; //отображает после покупки автокликера,что он куплен
}

function upgradeMaxEnergy() {
    const clicks = parseInt(localStorage.getItem('clickCount')) || 0;
    if (clicks >= upgradeMaxEnergyCost) {
      localStorage.setItem('clickCount', clicks - upgradeMaxEnergyCost);
  
      maxEnergy += 50; // Увеличиваем максимальную энергию (можно сделать переменную)
      localStorage.setItem('maxEnergy', maxEnergy.toString());
  
      // Полностью восстанавливаем энергию при улучшении
      energy = maxEnergy;
      localStorage.setItem('energy', energy.toString());
  
      updateEnergyDisplay();
      updateMaxEnergyDisplay();
      updateUpgradeView(); // Обновляем UI
      return true;
    } else {
      alert("Not enough clicks!");
      return false;
    }
  }


// document.getElementById('upgradeMaxEnergyButton').addEventListener('click',  upgradeMaxEnergy);

//Initial values
initialValues();
//Update every X time
setInterval(addCoins, 1000);

window.addEventListener("beforeunload", (event) => {
    // Call the saveProgress function
    saveProgress();
  
    // Optionally, you can show a confirmation dialog
    event.preventDefault(); // For most browsers
    event.returnValue = ''; // For Chrome
  });

