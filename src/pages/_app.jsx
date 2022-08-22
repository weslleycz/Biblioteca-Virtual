import { CookiesProvider } from "react-cookie";
import { Header } from "../components/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <CookiesProvider>
                <Header></Header>
                <Component {...pageProps} />
            </CookiesProvider>
        </>
    );
}

export default MyApp;
