import style from "./Button.module.css";

export const Button = ({loadMore}) => {
    return(
        <div onClick={loadMore} className={style["button-container"]}>
            <button type="button" className={style["Button"]}>Load more</button>
        </div>
    )
}