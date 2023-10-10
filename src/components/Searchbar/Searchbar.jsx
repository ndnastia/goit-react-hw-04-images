import style from "./Searchbar.module.css"

export const Searchbar = ({handleSubmit}) => {
    return (
        <header className={style["Searchbar"]}>
            <form onSubmit={handleSubmit} className={style["SearchForm"]}>
                <button type="submit" className={style["SearchForm-button"]}>
                    <span className={style["SearchForm-button-label"]}>Search</span>
    </button>

    <input
            className={style["SearchForm-input"]}
            name="searchQuery"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
}