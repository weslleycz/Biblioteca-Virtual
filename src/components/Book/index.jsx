import "react-multi-carousel/lib/styles.css";
import Styles from "./styles.module.scss";

export const Book = ({ item }) => {
    return (
        <>
            <img
                height={400}
                width={300}
                className={Styles.item}
                src={`${item.cover}`}
                alt=""
            ></img>
        </>
    );
};
