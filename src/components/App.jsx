import { useState, useEffect } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchingBar/SearchingBar";
import { fetchImages } from "./FetchImages";
import { Loader } from "./Loader/Loader";

/**
 * Компонент App є головним компонентом для додатку, що здійснює пошук зображень.
 * Використовує Pixabay API для пошуку та відображення зображень.
 * @returns {JSX.Element} Головний компонент додатку.
 */

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  /**
   * Виконує побічні ефекти для пошуку зображень при зміні пошукового запиту або сторінки.
   */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoadingImage(true);
        const images = await fetchImages(searchString, page, controller);
        if (page === 1) {
          setImages(images.hits);
          setTotal(images.total);
          setTotalHits(images.totalHits);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setImages((prevImages) => [...prevImages, ...images.hits]);
        }
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          Notify.failure("Sorry, wrong request, try reloading the page");
          console.error(error);
        }
      } finally {
        setIsLoadingImage(false);
      }
    }

    if (searchString) fetchData();

    return () => {
      controller.abort();
    };
  }, [searchString, page]);

  /**
   * Створює список зображень для відображення.
   * @returns {Array} Список зображень.
   */

  const buildSelectImageList = () => {
    return images.map((image) => ({
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    }));
  };

  /**
   * Обробляє подання форми пошуку.
   * @param {string} searchNameImages - Пошуковий запит.
   */

  const handleFormSubmit = (searchNameImages) => {
    if (searchNameImages !== searchString) {
      setSearchString(searchNameImages);
      setPage(1);
      setImages([]);
    }
  };

  /**
   * Змінює номер сторінки для пагінації.
   */

  const changePageNumber = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const imageList = buildSelectImageList();

  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        fontSize: 40,
        color: "#010101",
      }}
    >
      <SearchBar onSubmit={handleFormSubmit} />
      {isLoadingImage && <Loader />}
      <ImageGallery imageList={imageList} />
      {images.length > 0 && total > 12 && totalHits > page * 12 && (
        <Button changePage={changePageNumber} />
      )}
    </div>
  );
};
