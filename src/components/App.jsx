import { useState, useEffect } from "react";

import style from "./App.module.css"

import { fetchImages } from "helpers/api";
import { Loader } from "./Loader/Loader";
import { Searchbar } from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";



export const App = () => {
 
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [isButtonShown, setIsButtonShown] = useState(true);
  const [perPage, setPerPage] = useState(12);
  const [prevPerPage, setPrevPerPage] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const fetchAllImages = async () => {
    try {
      setIsLoading(true);

      const imagesGallery = await fetchImages(perPage, searchQuery);
      setImages(imagesGallery.hits);
      setTotalHits(imagesGallery.totalHits)
      
     if(perPage.length >= totalHits.length) {
      setIsButtonShown(false)
     }

     if (perPage.length < totalHits.length) {
      setIsButtonShown(true)
     }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllImages();
  }, [])
 
  useEffect(() => {
     if (searchQuery !== prevSearchQuery || perPage !== prevPerPage) {
      fetchAllImages();
    }
    setPrevSearchQuery(searchQuery);
    setPrevPerPage(perPage);
  }, [searchQuery,perPage])



  const onLoadMore = () => {
    setPerPage(prevPerPage => prevPerPage + 12)
  }

  const onHandleSubmit = event => {
  event.preventDefault();
    const query = event.currentTarget.elements.searchQueryValue.value;
    setSearchQuery(query);
    setImages(null);
    setPerPage(12)
    event.currentTarget.reset();
  }

  
    const showImages =
      Array.isArray(images) && images.length;
    
    return (
      <div className={style['App']}>
        
        <Searchbar handleSubmit={onHandleSubmit} />
        {isLoading && <Loader />}
        {error && <p className={style["error"]}>{error}</p>}
        {showImages && <ImageGallery images={images} />}
        
        {isButtonShown && (<Button loadMore={onLoadMore} />)} 
        
        
        
    </div>
      )
    
  
}
