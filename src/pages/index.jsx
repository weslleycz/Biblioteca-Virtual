import { useRouter } from "next/router";
import { Hero } from "../components/Hero";
import { News } from "../components/News";

export default function Home() {
    const router = useRouter();
    return (
        <>
            <Hero></Hero>
            <News></News>
        </>
    );
}
