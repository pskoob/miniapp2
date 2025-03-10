async function FetchUserData() {
  stopAutoClicker()

    // const tg_id = getTelegramUserId();
    const tg_id = 628225666

if (tg_id) {
    console.log("Telegram User ID:", tg_id);
    // Use the user ID
} else {
    console.log("User ID not available.");
    // Handle the case where the user ID is not available
}

    try {
      const response = await fetch(`http://localhost:8000/get_user_progress/${tg_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.name);
      // document.getElementById("user-name").textContent = data.name;
      localStorage.setItem('hasAutoClicker', data.hasAutoClicker)
      localStorage.setItem('upgradeLevel', data.upgradeLevel)
      localStorage.setItem('clickCount', data.clickCount)
      

    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      // document.getElementById("user-name").textContent = "Ошибка загрузки имени";
    }
    
  }



  
  function getTelegramUserId() {
    try {
        const webApp = Telegram.WebApp;
        const tg_id = webApp.initDataUnsafe?.user?.id;
        return tg_id || null; // Return userId if available, otherwise return null
    } catch (error) {
        console.error("Error getting Telegram user ID:", error);
        return null; // Return null if there's an error
    }
}

async function saveProgress() {
  // Получаем данные из localStorage и преобразуем их в нужные типы
  const tg_id = 628225666; // Замените на фактический tg_id
  const clickCount = parseInt(localStorage.getItem('clickCount'), 10); // Преобразуем строку в число
  const upgradeLevel = parseInt(localStorage.getItem('upgradeLevel'), 10); // Преобразуем строку в число
  const hasAutoClicker = localStorage.getItem('hasAutoClicker') === 'true'; // Преобразуем строку в булевое значение

  // Формируем объект progressData
  const progressData = {
    
      tg_id: tg_id,                // Целое число
      clickCount: clickCount,      // Целое число
      upgradeLevel: upgradeLevel,   // Целое число
      hasAutoClicker: hasAutoClicker // Булевое значение
      
  };
  console.log(progressData)
  try {
      const response = await fetch("http://localhost:8000/save_progress", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(progressData) // Преобразуем объект в JSON
      });

      console.log(progressData); // Логируем отправляемые данные

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Progress saved successfully:", data);
      // Обработка ответа по мере необходимости

  } catch (error) {
      console.error("Ошибка при сохранении прогресса:", error);
      // Обработка ошибки по мере необходимости
  }
}
window.addEventListener("beforeunload", (event) => {
  // Call the saveProgress function
  saveProgress();

  // Optionally, you can show a confirmation dialog
  event.preventDefault(); // For most browsers
  event.returnValue = ''; // For Chrome
});



// Функция для запуска авто-кликера
async function startAutoClicker() {
  const tg_id = 628225666; 
    try {
        const response = await fetch(`http://localhost:8000/start_auto_clicker/${tg_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log("Auto Clicker started successfully:", data);

    } catch (error) {
        console.error("Ошибка при запуске авто-кликера:", error);
    }
}

// Функция для остановки авто-кликера
async function stopAutoClicker() {
  const tg_id = 628225666; 
  try {
      const response = await fetch(`http://localhost:8000/stop_auto_clicker/${tg_id}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("Auto Clicker stopped successfully:", data);

  } catch (error) {
      console.error("Ошибка при остановке авто-кликера:", error);
  }
}

// Обработчик события beforeunload
window.addEventListener('beforeunload', async (event) => {
  // Сначала вызываем saveProgress
  await saveProgress(); // Ждем завершения saveProgress

  // Затем вызываем startAutoClicker
  startAutoClicker();

  // Опционально, можно показать диалог подтверждения
  event.preventDefault(); // Для большинства браузеров
  event.returnValue = ''; // Для Chrome
});

// Обработчик события visibilitychange
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
      // Если страница скрыта (пользователь закрыл приложение)
      // startAutoClicker();
  } else {
      // Если страница видима (пользователь открыл приложение)
      stopAutoClicker();
  }
});