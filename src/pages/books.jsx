import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Book } from "../components/Book";
import Styles from "./books.module.scss";
const books = () => {
    const [book, setBook] = useState([]);
    const [cookies, setCookie] = useCookies(["token"]);
    const getBook = async () => {
        const data = await axios.get("/getBook");
        setBook(
            data.data.data.sort(function (a, b) {
                return a.title > b.title ? 1 : b.nome > a.nome ? -1 : 0;
            })
        );
    };

    useEffect(() => {
        getBook();
    }, []);

    const handleChange = async (event) => {
        const search = event.target.value;
        if (search != "") {
            const data = await axios.get(`/searchBook/${search}`);
            setBook(data.data.data);
        } else {
            const data = await axios.get("/getBook");
            setBook(data.data.data);
        }
    };

    return (
        <>
            <Container
                sx={{
                    textAlign: "center",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    justifyContent: "center",
                    marginTop: "2%",
                    alignItems: "center",
                }}
                fixed
            >
                <Card className={Styles.conteinerBook}>
                    <Card
                        sx={{
                            padding: "2%",
                            marginBlockEnd: "1.5%",
                            boxShadow: "0px 4px 4px rgba(87, 82, 82, 0.25)",
                        }}
                    >
                        <Stack direction="row" spacing={2}>
                            <Paper
                                component="form"
                                sx={{
                                    p: "2px 4px",
                                    display: "flex",
                                    border: "1px solid rgba(153, 153, 153, 0.25)",
                                    alignItems: "center",
                                    boxShadow:
                                        "0px 4px 4px rgba(22, 22, 22, 0.25)",
                                    width: "100%",
                                    background: "#f8f8f8",
                                }}
                            >
                                <InputBase
                                    onChange={handleChange}
                                    fullWidth={true}
                                    sx={{
                                        ml: 1,
                                        flex: 1,
                                        background: "#f8f8f8",
                                    }}
                                    placeholder="Busca livros..."
                                    inputProps={{
                                        "aria-label": "Busca livro...",
                                    }}
                                />
                                <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Stack>
                    </Card>
                    <Grid container item sx={{ minHeight: "34rem" }}>
                        {book.map((item) => {
                            return (
                                <>
                                    <Book dashboard={false} item={item}></Book>
                                </>
                            );
                        })}
                    </Grid>
                </Card>
            </Container>
        </>
    );
};
export default books;
