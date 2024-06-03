import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

/**
 * Компонент ImageGallery відповідає за відображення списку зображень у вигляді галереї.
 * @param {Object} props - Властивості компоненту.
 * @param {Array} props.imageList - Масив об'єктів зображень.
 * @returns {JSX.Element} Компонент галереї зображень.
 */
export const ImageGallery = ({ imageList }) => {
  return (
    <ImageGalleryList>
      {imageList.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
