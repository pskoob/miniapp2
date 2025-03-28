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
  console.log("Данные, полученные с сервера:", data);

  localStorage.setItem('hasAutoClicker', data.hasAutoClicker);
  localStorage.setItem('upgradeLevel', data.upgradeLevel);

  // Проверяем data.upgradeEnergy перед установкой
  // if (data.upgrade_energy !== undefined && data.upgrade_energy !== null) {
      localStorage.setItem('upgradeEnergy', data.upgrade_energy);
  // } else {
  //     console.warn("Сервер вернул undefined или null для upgradeEnergy, не перезаписываем значение в localStorage.");
  // }

  localStorage.setItem('clickCount', data.clickCount);

} catch (error) {
  console.error("Ошибка при получении данных пользователя:", error);
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
  const tg_id = 628225666;
  const clickCount = parseInt(localStorage.getItem('clickCount'), 10);
  const upgradeLevel = parseInt(localStorage.getItem('upgradeLevel'), 10);
  const upgradeEnergy =  parseInt(localStorage.getItem('upgradeEnergy'), 10);
  console.log("Данные, полученные при преобразовании энергии", upgradeEnergy);
  // let upgradeEnergyValue = localStorage.getItem('upgradeEnergy');
  // console.log("upgradeEnergyValue из localStorage в saveProgress:", upgradeEnergyValue);

  // let upgradeEnergy = 0; // Значение по умолчанию
  // if (upgradeEnergyValue) { // Проверяем, что значение существует
  //     upgradeEnergy = parseInt(upgradeEnergyValue, 10);
  //     if (isNaN(upgradeEnergy)) { // Проверяем, что преобразование прошло успешно
  //         console.error("Не удалось преобразовать upgradeEnergy в число, используем значение по умолчанию 0");
  //         upgradeEnergy = 0; // Используем значение по умолчанию
  //     }
  // } else {
  //     console.warn("upgradeEnergy отсутствует в localStorage, используем значение по умолчанию 0");
  // }

  // console.log("upgradeEnergy после обработки в saveProgress:", upgradeEnergy);

  const hasAutoClicker = localStorage.getItem('hasAutoClicker') === 'true';

  // Формируем объект progressData
  const progressData = {
      tg_id: tg_id,
      clickCount: clickCount,
      upgradeLevel: upgradeLevel,
      upgradeEnergy: upgradeEnergy, //  Используем *преобразованное* значение!
      hasAutoClicker: hasAutoClicker
  };

  console.log("Данные для отправки на сервер:", progressData); // Проверяем данные перед отправкой

  try {
      const response = await fetch("http://localhost:8000/save_progress", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(progressData)
      });

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
document.addEventListener('DOMContentLoaded', () => {
  console.log("Проверяем upgradeEnergy в localStorage..."); // Добавлено
  if (!localStorage.getItem('upgradeEnergy')) {
      console.log("upgradeEnergy не найден, инициализируем..."); // Добавлено
      localStorage.setItem('upgradeEnergy', '0');
      console.log("upgradeEnergy инициализирован в localStorage"); // Добавлено
  } else {
      console.log("upgradeEnergy уже существует в localStorage, значение:", localStorage.getItem('upgradeEnergy')); // Добавлено
  }
});
// Обработчик события beforeunload
window.addEventListener('beforeunload', async (event) => {
  console.log("Значение upgradeEnergy в localStorage перед saveProgress:", localStorage.getItem('upgradeEnergy'));
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