import { Hearts } from "react-loader-spinner";
import style from "./Loader.module.css"
export const Loader = () => {
    return (<div className={style["loader"]}>
        <Hearts 
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
        
    )
}