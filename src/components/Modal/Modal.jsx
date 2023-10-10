
import style from "./Modal.module.css"

export const Modal = ({ largeImage, id, close }) => {
    
    return (
        <div onClick={close} className={style["Overlay"]}>
            <div className={style["Modal"]}>
            <img src={largeImage} alt={id} />
            </div>
        </div>
    )
    
} 