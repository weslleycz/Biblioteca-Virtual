import DeleteIcon from "@mui/icons-material/Delete";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useMedia } from "../hooks/useMedia";
import { firestore } from "../servers/firebase";
import { theme } from "../styles/theme/materialUi";

const Cart = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const isWide = useMedia("(min-width: 480px)");
    const [list, setList] = useState(
        <RemoveShoppingCartOutlinedIcon
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                color: "#ff6868",
                fontSize: "300px",
                alignItems: "center",
            }}
        ></RemoveShoppingCartOutlinedIcon>
    );

    const getCart = async () => {
        const data = await axios.get(`/getIdCar/${cookies.token}`);
        const querySnapshot = await getDocs(
            collection(firestore, data.data.data.idCar)
        );
        const books = [];
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        setList(
            books.map((book) => {
                return (
                    <>
                        <ListItem sx={{ width: "100%" }}>
                            <ListItemAvatar>
                                <img src={book.cover} height={90}></img>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ marginLeft: 2 }}
                                primary={book.book}
                            />
                            <DeleteIcon
                                onClick={() => deleteBook(book.id)}
                                sx={{
                                    color: "#f85e5e",
                                    cursor: "pointer",
                                    ":hover": {
                                        borderRadius: "50%",
                                        background: "#ffe7e7",
                                    },
                                    margin: "2%",
                                }}
                            ></DeleteIcon>
                        </ListItem>
                        <Divider
                            sx={{
                                textAlign: "center",
                                marginRight: "10%",
                                marginLeft: "10%",
                            }}
                            variant="inset"
                            component="li"
                        />
                    </>
                );
            })
        );
    };

    const deleteBook = async (id) => {
        const data = await axios.get(`/getIdCar/${cookies.token}`);
        await deleteDoc(doc(firestore, data.data.data.idCar, id));
        getCart();
    };

    useEffect(() => {
        if (cookies.user === "reader") {
            getCart();
        } else {
            Router.push("/");
        }
    }, []);

    return (
        <>
            <Container component="main" maxWidth="md">
                <Card
                    sx={{
                        marginTop: 3,
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            paddingTop: "2%",
                            paddingLeft: "2%",
                            paddingRight: "2%",
                        }}
                        gutterBottom
                    >
                        Meu Carrinho
                    </Typography>
                    <List
                        sx={{
                            height: "400px",
                            width: "100%",
                            overflow: "auto",
                        }}
                    >
                        <Divider></Divider>
                        {list}
                    </List>
                    <Divider></Divider>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            fullWidth={true}
                            sx={{
                                width: isWide ? "90%" : "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "0 auto",
                                marginTop: "2%",
                                marginBlockEnd: "2%",
                            }}
                            disableElevation
                        >
                            Reservar
                        </Button>
                    </ThemeProvider>
                </Card>
            </Container>
        </>
    );
};

export default Cart;
