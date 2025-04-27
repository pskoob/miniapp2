const THEMES = {
    "simpson": {
   
        backgroundImage: "url('fon.jpg')", // Replace with forest background
    },
    "mountains": {
        
        backgroundImage: "url('fon2.jpg')", // Replace with mountains background
    },
    "beach": {
    
        backgroundImage: "url('back.jpg')", // Replace with beach background
    },
};

const DEFAULT_THEME = "beach"; // or whatever your default is

function getStoredTheme() {
    return localStorage.getItem("selectedTheme") || DEFAULT_THEME;
}

function setStoredTheme(themeName) {
    localStorage.setItem("selectedTheme", themeName);
}

function applyTheme(themeName) {
    const themeLink = document.getElementById("theme-link");

    if (!themeLink) {
        console.error("Theme link element not found in HTML!");
        return;
    }

    if (!THEMES[themeName]) {
        console.error(`Theme "${themeName}" not found in THEMES object.`);
        return;
    }

    // themeLink.href = THEMES[themeName].cssFile; // You might not need this if you ONLY change background image
    document.body.style.backgroundImage = THEMES[themeName].backgroundImage;

    setStoredTheme(themeName);
}

window.addEventListener("DOMContentLoaded", () => {
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);
});


//  Adapt the installSkin function in shop.js to call applyTheme()
function installSkin(skinName) {
  //  Your logic to check if the user owns the skin would go here.
  //  For example:
  if (ownsSkin(skinName)) {
    applyTheme(skinName); // Apply the theme directly
  } else {
    alert("You must buy this skin first!");  // Or some other error message
  }
}

function ownsSkin(skinName) {
  //  Replace this with your actual skin ownership check.
  const purchasedSkins = JSON.parse(localStorage.getItem("purchasedSkins") || "[]");
  return purchasedSkins.includes(skinName);
}
