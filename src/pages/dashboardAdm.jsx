import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EditBook } from "../components/EditBook";

const dashboardAdm = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [deshbord, setDeshbord] = useState(<></>);
    useEffect(() => {
        if (cookies.user === "adm") {
            setDeshbord(
                <EditBook></EditBook>
            );
        }
    }, []);

    return <>{deshbord}</>;
};

export default dashboardAdm;
