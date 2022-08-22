import Router from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Off = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    useEffect(() => {
        removeCookie("token");
        removeCookie("user");
        Router.push("/");
    }, []);

    return <></>;
};
export default Off;
