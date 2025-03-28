// energy.js

// Global variables
var energy = 100;
var maxEnergy = 100; // Добавляем переменную для максимальной энергии
const baseMaxEnergy = 100; // Базовое значение maxEnergy
const energyRecoveryRate = 1;
const recoveryInterval = 1000;

var energyLevel = document.getElementById('energyLevel');
var energyText = document.getElementById('energyText');
var maxEnergyValue = document.getElementById('maxEnergyValue'); // Добавляем элемент для отображения maxEnergy

const upgradeMaxEnergyCost = 100;

function updateEnergyDisplay() {
  if (energyLevel && energyText) {
    energyLevel.style.width = (energy / maxEnergy) * 100 + '%'; 
    energyText.textContent = Math.floor(energy);
  }
}

function updateMaxEnergyDisplay() {
  if (maxEnergyValue) {
    maxEnergyValue.textContent = maxEnergy;
  }
}

function recoverEnergy() {
  if (energy < maxEnergy) {
    energy += energyRecoveryRate;
    energy = Math.min(energy, maxEnergy);

    localStorage.setItem('energy', energy.toString());
    updateEnergyDisplay();
  }
}



function getEnergy() {
  return energy;
}



// Load values from localStorage
var storedEnergy = localStorage.getItem('energy');
if (storedEnergy) {
  energy = parseInt(storedEnergy);
}

var storedMaxEnergy = localStorage.getItem('maxEnergy'); // Загружаем maxEnergy
if (storedMaxEnergy) {
  maxEnergy = parseInt(storedMaxEnergy);
}

// Initialize on load
updateEnergyDisplay();
updateMaxEnergyDisplay(); // Инициализируем отображение maxEnergy

// Start recovery interval
setInterval(recoverEnergy, recoveryInterval);

// Add event listener to the button
