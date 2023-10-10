import style from './ImageGalleryItem.module.css'
export const ImageGalleryItem = ({ webformatURL, id, onOpenModal, largeImageURL }) => {
    return (
        <li onClick={() => onOpenModal({ largeImageURL, id })} className={style["ImageGalleryItem"]}>
            <img className={style['ImageGalleryItem-image']} src={webformatURL} alt={id} />
        </li>
    )
}