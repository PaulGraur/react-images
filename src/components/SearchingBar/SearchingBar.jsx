import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  AiOutlineSearch,
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchingBar.styled';

/**
 * Компонент SearchBar відповідає за пошук зображень.
 * Включає форму для введення пошукового запиту та обробки подій.
 * @param {Object} props - Властивості компоненту.
 * @param {Function} props.onSubmit - Функція для обробки подання форми пошуку.
 * @returns {JSX.Element} Компонент панелі пошуку.
 */
export const SearchBar = props => {
  const [searchString, setSearchString] = useState('');

  /**
   * Обробляє зміну значення в полі введення пошукового запиту.
   * @param {Object} event - Об'єкт події.
   */
  const handleOnChange = event => {
    setSearchString(event.currentTarget.value.toLowerCase());
  };

  /**
   * Обробляє подання форми пошуку.
   * @param {Object} event - Об'єкт події.
   */
  const handleSubmit = event => {
    event.preventDefault();
    if (searchString.trim() === '') {
      Notify.info('Please, write name for the image');
      return;
    }
    props.onSubmit(searchString);
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <AiOutlineSearch />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          value={searchString}
          onChange={handleOnChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
