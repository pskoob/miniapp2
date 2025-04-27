// shop.js

const counterDisplay = document.getElementById('counterDisplay');

function updateCounter() {
    let clickCount = localStorage.getItem('clickCount');
    if (clickCount) {
        counterDisplay.innerText = Math.floor(parseFloat(clickCount));
    }
}
function previewSkin(skinName) {
    // Получаем модальное окно и изображение
    const modal = document.getElementById("previewModal");
    const previewImage = document.getElementById("previewImage");

    // Определяем путь к изображению скина на основе skinName
    let imagePath = "";
    switch (skinName) {
        case "simpson":
            imagePath = "fon.jpg"; // Путь к изображению для фона "Лес"
            break;
        case "mountains":
            imagePath = "fon2.jpg"; // Путь к изображению для фона "Горы"
            break;
        case "beach":
            imagePath = "back.jpg"; // Путь к изображению для фона "Пляж"
            break;
        default:
            imagePath = ""; // Путь к изображению по умолчанию (если skinName не распознан)
            break;
    }

    // Устанавливаем путь к изображению в элементе <img>
    previewImage.src = imagePath;

    // Отображаем модальное окно
    modal.style.display = "block";
}
// Получаем кнопку закрытия
const closeButton = document.querySelector(".close");

// Добавляем обработчик события для закрытия модального окна
closeButton.onclick = function() {
    const modal = document.getElementById("previewModal");
    modal.style.display = "none";
}
inventoryButton.addEventListener('click',()=>{
    window.location.href = "inventory.html";
})
// Закрываем модальное окно при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById("previewModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function buySkin(skinName, skinPrice) {
    let clickCount = parseFloat(localStorage.getItem('clickCount')) || 0;

    if (clickCount >= skinPrice) {
        // Deduct the skin price from clickCount
        clickCount -= skinPrice;

        localStorage.setItem('clickCount', clickCount);
        let skins = JSON.parse(localStorage.getItem('skins')) || {};
        skins[skinName] = true;  // Mark the skin as owned

        localStorage.setItem('skins', JSON.stringify(skins));

        updateCounter();
        updateShopButtons(skinName);  // Update the button states
        alert('Скин куплен!');

        // Store the purchased skin (optional: for other purposes)
        let purchasedSkins = JSON.parse(localStorage.getItem("purchasedSkins") || "[]");
        purchasedSkins.push(skinName);
        localStorage.setItem("purchasedSkins", JSON.stringify(purchasedSkins));

    } else {
        alert('Недостаточно очков!');
    }
}






function updateShopButtons(skinName) {
    let skins = JSON.parse(localStorage.getItem('skins')) || {};

    const skinItem = document.querySelector(`.skin-item[data-skin="${skinName}"]`);

    if (skinItem) {
        const buyButton = skinItem.querySelector('.buy-button');
        const installButton = skinItem.querySelector('.install-button');

        if (buyButton) {  //Check if the buy button is found
            if (skins[skinName]) {
                buyButton.style.display = 'none'; 
            } else {
                buyButton.style.display = 'inline-block'; //Show it if not owned
            }
        } else {
            console.warn(`Buy button not found for skin: ${skinName}`);
        }

        if (installButton) {  //Check if the install button is found
            if (skins[skinName]) {
                installButton.style.display = 'inline-block'; //Show install if owned
            } else {
                installButton.style.display = 'none'; //Hide install if not owned
            }
        } else {
            console.warn(`Install button not found for skin: ${skinName}`);
        }
    } else {
        console.warn(`Skin item not found for skin: ${skinName}`);
    }
}

upgradeButton.addEventListener('click', () => {
    window.location.href = "upgrade.html";
});

miningButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

window.onload = function() {
    // Check purchased skins and update buttons
    const skinItems = document.querySelectorAll('.skin-item');
    skinItems.forEach(item => {
        const skinName = item.dataset.skin;
        updateShopButtons(skinName); //This is very important
    });

    let savedSkin = localStorage.getItem("skin");
    if (savedSkin) {
        applySkin(savedSkin);
    }
}