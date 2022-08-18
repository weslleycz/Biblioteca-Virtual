import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { Book } from "../Book";
import Styles from "./styles.module.scss";

export const EditBook = () => {
    const [book, setBook] = useState([]);

    const handleChange = async (event) => {
        const search= event.target.value   
            if (search!="") {
                const data = await axios.get(`/searchBook/${search}`);
                setBook(data.data.data);
            }else{
                const data = await axios.get("/getBook");
                setBook(data.data.data);
            }
    };

    const getBook = async () => {
        const data = await axios.get("/getBook");
        setBook(data.data.data);
    };

    useEffect(() => {
        getBook();
    }, []);

    return (
        <>
            <Container 
            sx={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
            }}
            fixed>
            <Box className={Styles.conteinerBook}>
            <Box sx={{ background: "#f1f1f1",
            borderTopLeftRadius:"20px",
            borderTopRightRadius:"20px",
             padding:"4%",
             marginY: 3 }}>
                    <TextField
                        onChange={handleChange}
                        id="outlined-basic"
                        sx={{
                            background: "#fafafa",
                            margin: "0 aute",
                            alignContent: "center",
                            textAlign: "center",
                            width: "70%",
                        }}
                        fullWidth={true}
                        label="Buscar livro"
                        variant="outlined"
                    />
                </Box>
                    <Grid container item >
                        {book.map((item) => {
                            return (
                                <>
                                    <Book dashboard={false} item={item}></Book>
                                </>
                            );
                        })}
                    </Grid>
            </Box>
            </Container>
        </>
    );
};
