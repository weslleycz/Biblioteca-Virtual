import { useCookies } from "react-cookie";
import Router from "next/router";
import { useEffect } from "react";

const Logoff = () => {
    const [cookies, setCookie,removeCookie] = useCookies(["token"]);

    useEffect(() => {
        removeCookie("token");
        removeCookie("user");
        Router.push("/");
      },[]);

    return (<></>)
}
export default Logoff