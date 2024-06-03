/**
 * Функція для отримання зображень за допомогою API Pixabay.
 * @param {string} value - Пошуковий запит.
 * @param {number} page - Номер сторінки для пагінації.
 * @param {AbortController} controller - Об'єкт контролера, який дозволяє скасувати запит.
 * @returns {Promise<object>} Об'єкт з даними зображень.
 */

export const fetchImages = async (value, page, controller) => {
  const API_KEY = '29499204-a77a5df2d9e32bd170e84cd3d';
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`,
      { signal: controller.signal }
    );
    return response.data;
  } catch (error) {
    // Обробка помилок
    console.error('Помилка при отриманні зображень:', error);
    throw error;
  }
};
