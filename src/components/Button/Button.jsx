import PropTypes from 'prop-types';
import { ButtonMore } from './Button.styled';

/**
 * Компонент Button відповідає за відображення кнопки для завантаження додаткових зображень.
 * @param {Object} props - Властивості компоненту.
 * @param {Function} props.changePage - Функція для зміни номера сторінки.
 * @returns {JSX.Element} Компонент кнопки.
 */

export const Button = (props) => {
  /**
   * Обробляє клік по кнопці.
   */
  const handleButton = () => {
    props.changePage();
  };

  return (
    <ButtonMore type="button" onClick={handleButton}>
      Load more
    </ButtonMore>
  );
};

Button.propTypes = {
  /**
   * Функція для зміни номера сторінки.
   */
  changePage: PropTypes.func.isRequired,
};
