let count = 0;
// let energy = 100;
// const maxEnergy = 100;
// const energyRecoveryRate = 1;
// const recoveryInterval = 2000;

const counterDisplay = document.getElementById('counterDisplay');
// const energyLevel = document.getElementById('energyLevel');
// const energyText = document.getElementById('energyText');
const coinButton = document.getElementById('coinButton');
const upgradeButton = document.getElementById('upgradeButton');

FetchUserData()
// stopAutoClicker()
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

function useEnergy(amount) {
    if (energy >= amount) {
      energy -= amount;
      energy = Math.max(0, energy); // Ensure energy doesn't go below 0
      localStorage.setItem('energy', energy.toString());
  
      updateEnergyDisplay();
      return true;
    } else {
      return false;
    }
  }
  
  document.getElementById('coinButton').addEventListener('click', function() {
    const energyPerClick = 1; // Количество энергии, которое тратится при клике
    const success = useEnergy(energyPerClick); // Пытаемся потратить энергию
    
    if (success) {
      // Действие выполнено успешно (энергия потрачена)
      console.log("Клик успешен! Энергия потрачена.");
      // ... Здесь может быть код для увеличения счетчика кликов, добавления очков и т.д. ...
    } else {
      // Недостаточно энергии
      console.log("Недостаточно энергии!");
      // ... Здесь может быть код для отображения сообщения об ошибке ...
    }
  });
  

upgradeButton.addEventListener('click', () => {
    window.location.href = "upgrade.html";
});
shopButton.addEventListener('click', () => {
  window.location.href = "shop.html";
});
inventoryButton.addEventListener('click', () => {
  window.location.href = "inventory.html";
});


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
    if (useEnergy(0)) {
        let upgradeLevel = localStorage.getItem('upgradeLevel') || 0;
        let increment = parseInt(upgradeLevel) + 1;

        // Get current clicks from localStorage
        let currentClicks = parseFloat(localStorage.getItem('clickCount')) || 0;

        // Increment clicks
        currentClicks += increment;

        localStorage.setItem('clickCount', currentClicks);

        updateCounter();

        energy -= 1;
        // energyLevel.style.width = energy + '%';
        // energyText.textContent = energy;
    } else {
        alert("Энергия исчерпана!");
    }
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
