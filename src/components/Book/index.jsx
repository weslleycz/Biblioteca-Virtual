import "react-multi-carousel/lib/styles.css";
import Styles from "./styles.module.scss";
import { useMedia } from "../../hooks/useMedia";
import Router from "next/router";

export const Book = ({ item }) => {
    const isWide = useMedia("(min-width: 480px)");
    return (
        <>
                <img
                    height={isWide ? 400 : 450}
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
 