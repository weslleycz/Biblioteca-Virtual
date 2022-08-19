import "react-multi-carousel/lib/styles.css";
import Styles from "./styles.module.scss";
import Router from "next/router";

export const Book = ({ item }) => {
    return (
        <>
                <img
                    height={400}
                    width={300}
                    className={Styles.item}
                    src={`${item.cover}`}
                    onClick={()=>Router.push(`/select/${item.id}`)}
                    href={`/select/${item.id}`}
                    alt=""
                ></img>
        </>
    );
};

