import PropTypes from 'prop-types';
import { ImageGalleryListItem, ImageListItem } from './ImageGalleryItem.styled';

/**
 * Компонент ImageGalleryItem відповідає за відображення окремого елемента галереї зображень.
 * @param {Object} props - Властивості компоненту.
 * @param {Object} props.image - Об'єкт, що представляє зображення.
 * @param {number} props.image.id - Унікальний ідентифікатор зображення.
 * @param {string} props.image.webformatURL - URL для малого формату зображення.
 * @param {string} props.image.largeImageURL - URL для великого формату зображення.
 * @param {string} props.image.tags - Опис або теги зображення.
 * @returns {JSX.Element} Компонент елемента галереї зображень.
 */
export const ImageGalleryItem = ({ image }) => {
  return (
    <ImageGalleryListItem>
      <ImageListItem
        small={image.webformatURL}
        large={image.largeImageURL}
        alt={image.tags}
      />
    </ImageGalleryListItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
