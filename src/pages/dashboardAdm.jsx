import { useCookies } from "react-cookie";
import { useEffect,useState } from "react";

const dashboardAdm = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [deshbord, setDeshbord]=useState(<></>)

    useEffect(() => {
        if (cookies.user==="adm") {
            setDeshbord(<h1>11111</h1>)
        }
      },[])

    return <>
    {deshbord}
    </>
};

export default dashboardAdm;
