import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMedia } from "../hooks/useMedia";
import { theme } from "../styles/theme/materialUi";
import Styles from "./select.module.scss";

const Select = () => {
    const router = useRouter();
    const url = router.asPath;
    const isWide = useMedia("(min-width: 480px)");

    const [book, setBook] = useState({});

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
                <Grid container spacing={1} columns={isWide ? 16 : 5}>
                    <Grid xs={6} md={4}>
                        <img height={400} width={300} src={book.cover}></img>
                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                sx={{ width: isWide ? "106%" : "88%" }}
                                endIcon={<ShoppingCartIcon />}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </ThemeProvider>
                    </Grid>
                    <Grid xs={6} md={12}>
                        <Typography variant="h4" gutterBottom>
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
                        <Rating
                            name="size-medium"
                            disabled
                            size="medium"
                            defaultValue={book.rating}
                        />
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
