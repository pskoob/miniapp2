document.addEventListener('DOMContentLoaded', function() {
    console.log("inventory.js loaded");

    let skins = JSON.parse(localStorage.getItem('skins')) || {};
    let lootboxes = JSON.parse(localStorage.getItem('lootboxes')) || {};
    let items = JSON.parse(localStorage.getItem('items')) || {};

    const skinsGrid = document.getElementById('skinsGrid');
    const lootboxesGrid = document.getElementById('lootboxesGrid');
    const itemsGrid = document.getElementById('itemsGrid');

    function displaySkins() {
        if (skinsGrid) {
            skinsGrid.innerHTML = '';
            for (const skinName in skins) {
                if (skins.hasOwnProperty(skinName) && skins[skinName] === true) {
                    let imagePath = "";
                    switch (skinName) {
                        case "simpson":
                            imagePath = "fon.jpg";
                            break;
                        case "mountains":
                            imagePath = "fon2.jpg";
                            break;
                        case "beach":
                            imagePath = "back.jpg";
                            break;
                        default:
                            imagePath = "";
                            break;
                    }

                    const skinItem = document.createElement('div');
                    skinItem.classList.add('skin-item');

                    const skinImage = document.createElement('img');
                    skinImage.src = imagePath;
                    skinImage.alt = `Скин: ${skinName}`;

                    const skinNameElement = document.createElement('p');
                    skinNameElement.textContent = skinName;

                    const installButton = document.createElement('button');
                    installButton.textContent = 'Установить';
                    installButton.addEventListener('click', function() {
                        installSkin(skinName);
                    });

                    skinItem.appendChild(skinImage);
                    skinItem.appendChild(skinNameElement);
                    skinItem.appendChild(installButton);

                    skinsGrid.appendChild(skinItem);
                }
            }
        } else {
            console.error("Элемент skinsGrid не найден!");
        }
    }

    function displayLootboxes() {
        if (lootboxesGrid) {
            lootboxesGrid.innerHTML = '';
            for (const lootboxName in lootboxes) {
                if (lootboxes.hasOwnProperty(lootboxName)) {
                    const lootboxItem = document.createElement('div');
                    lootboxItem.classList.add('item-item');

                    const lootboxImage = document.createElement('img');
                    lootboxImage.src = `lootbox.png`;
                    lootboxImage.alt = `Лутбокс: ${lootboxName}`;

                    const lootboxNameElement = document.createElement('p');
                    lootboxNameElement.textContent = lootboxName;

                    lootboxItem.appendChild(lootboxImage);
                    lootboxItem.appendChild(lootboxNameElement);

                    lootboxesGrid.appendChild(lootboxItem);
                }
            }
        } else {
            console.error("Элемент lootboxesGrid не найден!");
        }
    }

    function displayItems() {
        if (itemsGrid) {
            itemsGrid.innerHTML = '';
            for (const itemName in items) {
                if (items.hasOwnProperty(itemName)) {
                    const itemItem = document.createElement('div');
                    itemItem.classList.add('item-item');

                    const itemImage = document.createElement('img');
                    itemImage.src = `item.png`;
                    itemImage.alt = `Предмет: ${itemName}`;

                    const itemNameElement = document.createElement('p');
                    itemNameElement.textContent = itemName;

                    itemItem.appendChild(itemImage);
                    itemItem.appendChild(itemNameElement);

                    itemsGrid.appendChild(itemItem);
                }
            }
        } else {
            console.error("Элемент itemsGrid не найден!");
        }
    }
    miningButton.addEventListener('click',()=>{
        window.location.href = "index.html";
    })
    shopButton.addEventListener('click', () => {
        window.location.href = "shop.html";
      });
      const THEMES = {
        "simpson": {
            backgroundImage: "url('fon.jpg')", 
        },
        "mountains": {
            backgroundImage: "url('fon2.jpg')", 
        },
        "beach": {
            backgroundImage: "url('back.jpg')", 
        },
    };

    const DEFAULT_THEME = "back.jpg"; 

  

    function applyTheme(themeName) {
        

        if (!THEMES[themeName]) {
            console.error(`Theme "${themeName}" not found in THEMES object.`);
            return;
        }

      
        document.body.style.backgroundImage = THEMES[themeName].backgroundImage;

        setStoredTheme(themeName);
    }

    function ownsSkin(skinName) {
       
        const purchasedSkins = JSON.parse(localStorage.getItem("purchasedSkins") || "[]");
        return purchasedSkins.includes(skinName);
    }

  
    function installSkin(skinName) {

        if (ownsSkin(skinName)) {
            applyTheme(skinName);
        } else {
            alert("You must buy this skin first!"); 
        }
    }


    const tabButtons = document.querySelectorAll('.tab-button');
    console.log("tabButtons:", tabButtons);

    const tabContents = document.querySelectorAll('.tab-content');
    console.log("tabContents:", tabContents);

    window.activateTab = function(tabId) { // Делаем функцию глобальной
        console.log("activateTab called with tabId:", tabId);
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        console.log("tabButton:", tabButton);

        const tabContent = document.getElementById(tabId);
        console.log("tabContent:", tabContent);

        if (tabButton) tabButton.classList.add('active');
        if (tabContent) tabContent.classList.add('active');

        // Сохраняем активную вкладку в localStorage (опционально)
        localStorage.setItem('activeTab', tabId);
    }

    // Восстанавливаем активную вкладку из localStorage (если есть)
    const activeTab = localStorage.getItem('activeTab') || 'skins'; // По умолчанию - skins
    activateTab(activeTab);

    // Вызываем функцию для отображения содержимого активной вкладки
    switch (activeTab) {
        case 'lootboxes':
            displayLootboxes();
            break;
        case 'items':
            displayItems();
            break;
        default:
            displaySkins();
            break;
    }
});