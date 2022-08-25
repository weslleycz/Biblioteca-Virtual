import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "../../api/heroku";
import { doc, setDoc } from "firebase/firestore";
import Router, { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMedia } from "../../hooks/useMedia";
import { firestore } from "../../servers/firebase";
import { theme } from "../../styles/theme/materialUi";
import Styles from "./select.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Select = () => {
    const router = useRouter();
    const url = router.asPath;
    const isWide = useMedia("(min-width: 480px)");

    const [book, setBook] = useState({});

    const [cookies, setCookie] = useCookies(["token"]);

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const addCart = async () => {
        if (cookies.user === "reader") {
            handleClick();
            const data = await axios.get(`/getIdCar/${cookies.token}`);
            await setDoc(doc(firestore, data.data.data.idCar, book.id), {
                book: book.title,
                cover: book.cover,
                id: book.id,
            });
            handleClick();
            setTimeout(handleClose, 1000);
        } else {
            Router.push("/login");
        }
    };

    useEffect(() => {
        getBook();
    }, []);

    const getBook = async () => {
        const data = await axios
            .get(`/setBook/${url.substr(8)}`)
            .then((respone) => {
                setBook(respone.data.data);
            });
    };

    return (
        <>
            <Container sx={{ marginTop: "3%", textAlign: "center" }} fixed>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Adicionado ao carrinho!!!
                    </Alert>
                </Snackbar>
                <Grid container spacing={1} columns={isWide ? 16 : 5}>
                    <Grid xs={6} md={4}>
                        <img height={400} width={300} src={book.cover}></img>
                        <ThemeProvider theme={theme}>
                            <Button
                                onClick={() => addCart()}
                                variant="contained"
                                sx={{ width: isWide ? "106%" : "88%" }}
                                endIcon={<ShoppingCartIcon />}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </ThemeProvider>
                    </Grid>
                    <Grid xs={6} md={12}>
                        <Typography variant="h5" gutterBottom>
                            {book.title}
                        </Typography>
                        <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                        >
                            <a
                                className={Styles.author}
                                href={`https://pt.wikipedia.org/wiki/${book.author}`}
                            >
                                {book.author}
                            </a>
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                width: "90%",
                                textAlign: "left",
                                textJustify: "revert-layer",
                                justifyContent: "left",
                                alignItems: "center",
                                margin: "0 auto",
                                color: "#2b2a2a",
                            }}
                            gutterBottom
                        >
                            <Box>{book.description}</Box>
                        </Typography>
                        <Box
                            sx={{
                                width: "90%",
                                textAlign: "left",
                                textJustify: "revert-layer",
                                justifyContent: "left",
                                alignItems: "center",
                                margin: "0 auto",
                            }}
                        ></Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Select;
