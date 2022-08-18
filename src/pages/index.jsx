import { Hero } from "../components/Hero";
import { useCookies } from "react-cookie";
import { News } from "../components/News";

export default function Home() {
    const [cookies, setCookie] = useCookies(["token"]);
    return (
    <>
    <Hero></Hero>
    <News></News>
    </>
    );
}
