import {useState, useEffect} from "react";

import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Modal } from 'components/Modal/Modal';



export const ImageGallery = ({images}) => {
   
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);
  
    
  const onKeyDown = event => {
      if (event.code === 'Escape') {
      onCloseModal();
      }
    };

  const onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };
  
  const onOpenModal = modalData => {

    setIsOpen(true);
    setData(modalData);

    }

    const onCloseModal = () => {
      setIsOpen(false);
      setData(null);
    }

    useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  }, []);
        
        return (
            <div>
                <ul className={styles["ImageGallery"]}>
                {images.map((image) => <ImageGalleryItem {...image} key={image.id} onOpenModal={onOpenModal} />)}
            </ul>

                {isOpen && <Modal largeImage={data.largeImageURL} id={data.id} close={onOverlayClick} />}
            </div>
             
        )
}

