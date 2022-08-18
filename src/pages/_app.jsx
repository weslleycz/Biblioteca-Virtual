import "../styles/globals.scss";
import { Header } from "../components/Header";
import { CookiesProvider } from "react-cookie";

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
