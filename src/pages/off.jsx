import { useCookies } from "react-cookie";
import Router from "next/router";
import { useEffect } from "react";

const Off = () => {
    const [cookies, setCookie,removeCookie] = useCookies(["token"]);

    useEffect(() => {
        setCookie("token", "");
        setCookie("user", "");
        Router.push("/");
      },[]);

    return (<></>)
}
export default Off