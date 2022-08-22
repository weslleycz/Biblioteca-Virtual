import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CreateBook } from "../components/CreateBook";

const dashboardAdm = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [deshbord, setDeshbord] = useState(<></>);
    useEffect(() => {
        if (cookies.user === "adm") {
            setDeshbord(<CreateBook></CreateBook>);
        } else {
            Router.push("/adm");
        }
    }, []);

    return <>{deshbord}</>;
};

export default dashboardAdm;
