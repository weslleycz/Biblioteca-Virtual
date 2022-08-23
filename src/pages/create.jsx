import { useEffect, useState } from "react";
import { CreateBook } from "../components/CreateBook";

import { useCookies } from "react-cookie";
import Router from "next/router";
const create = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [login ,setLogin] = useState("")
    useEffect(() => {
        if (cookies.user === "adm") {
            setLogin(<CreateBook></CreateBook>)
        }else{
            Router.push("/adm");
        }
    },[])
    return (
        <>
        {login}
        </>
    )
}

export default create