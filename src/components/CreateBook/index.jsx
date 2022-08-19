import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { storage } from "../../servers/firebase";
import { theme } from "../../styles/theme/materialUi";
import { Book } from "../Book";
import Styles from "./styles.module.scss";

export const CreateBook = () => {
    const [book, setBook] = useState([]);
    const [cookies, setCookie] = useCookies(["token"]);

    const [open, setOpen] = useState(null);
    const handleClose = () => {
        setOpen(false);
        setBtn("");
    };
    const [btn, setBtn] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setBtn("none");
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [selectedImage, setSelectedImage] = useState(null);

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

    const getBook = async () => {
        const data = await axios.get("/getBook");
        setBook(data.data.data);
    };

    useEffect(() => {
        getBook();
    }, []);

    const [ISBN, setISBN] = useState();
    const [title, setTitle] = useState();
    const [year, setYear] = useState();
    const [author, setAuthor] = useState();
    const [description, setDescription] = useState();

    const handlesubmit = async () => {
        console.log(selectedImage);
        const storageRef = ref(storage, selectedImage.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    axios
                        .post(
                            "/createBook",
                            {
                                url: url,
                                ISBN: ISBN,
                                title: title,
                                year: year,
                                author: author,
                                description:description
                            },
                            {
                                headers: {
                                    authorization: cookies.token,
                                },
                            }
                        )
                        .then(() => {
                            setISBN("");
                            setTitle("");
                            setYear("");
                            setAuthor("");
                            getBook();
                            handleClose();
                        });
                });
            }
        );
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
                                    background: "#fdfffe",
                                }}
                            >
                                <InputBase
                                    onChange={handleChange}
                                    fullWidth={true}
                                    sx={{
                                        ml: 1,
                                        flex: 1,
                                        background: "#fdfffe",
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
                            <ThemeProvider theme={theme}>
                                <Fab
                                    sx={{ display: btn }}
                                    color="primary"
                                    onClick={handleOpen}
                                    aria-label="add"
                                >
                                    <AddIcon />
                                </Fab>
                            </ThemeProvider>
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
                    <Backdrop
                        onClose={handleClose}
                        sx={{
                            background: "rgba( 255, 255, 255, 0.25 )",
                            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                            backdropFilter: "blur( 5px )",
                            WebkitBackdropFilter: "blur( 5px )",
                            borderRadius: "10px",
                        }}
                        open={open}
                    >
                        <Card
                            sx={{
                                paddingTop: "2%",
                                paddingRight: "2%",
                                paddingLeft: "2%",
                                boxShadow: "0px 4px 4px rgba(87, 82, 82, 0.25)",
                                width: "60%",
                            }}
                        >
                            <Box
                                sx={{
                                    textAlign: "right",
                                }}
                            >
                                <CloseIcon onClick={handleClose}></CloseIcon>
                            </Box>
                            <CardContent>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <TextField
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            id="outlined-basic"
                                            label="Titulo"
                                            sx={{
                                                marginBlockEnd: "1.5%",
                                            }}
                                        />
                                        <TextField
                                            value={author}
                                            onChange={(e) =>
                                                setAuthor(e.target.value)
                                            }
                                            id="outlined-basic"
                                            label="Autor"
                                            variant="outlined"
                                            sx={{
                                                marginBlockEnd: "1.5%",
                                            }}
                                        />
                                        <TextField
                                            value={ISBN}
                                            onChange={(e) =>
                                                setISBN(e.target.value)
                                            }
                                            id="outlined-basic"
                                            label="ISBN"
                                            variant="outlined"
                                            sx={{
                                                marginBlockEnd: "1.5%",
                                            }}
                                        />
                                        <TextField
                                            onChange={(e) =>
                                                setYear(e.target.value)
                                            }
                                            value={year}
                                            id="outlined-basic"
                                            type="number"
                                            label="Ano de lançamento"
                                            variant="outlined"
                                            sx={{
                                                marginBlockEnd: "1.5%",
                                            }}
                                            onClick={handleClick}
                                        />
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Sinopse"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            multiline
                                            rows={4}
                                            sx={{
                                                marginBlockEnd: "1%",
                                            }}
                                        />
                                        <ThemeProvider theme={theme}>
                                            <Button
                                                sx={{
                                                    marginBlockEnd: "1.5%",
                                                }}
                                                variant="contained"
                                                component="label"
                                            >
                                                upload da capa
                                                <input
                                                    accept="image/*"
                                                    multiple
                                                    name="myImage"
                                                    variant="outlined"
                                                    onChange={(event) => {
                                                        console.log(
                                                            event.target
                                                                .files[0]
                                                        );
                                                        setSelectedImage(
                                                            event.target
                                                                .files[0]
                                                        );
                                                    }}
                                                    hidden
                                                    type="file"
                                                />
                                            </Button>
                                            <Stack
                                                direction="row"
                                                sx={{ marginTop: "6%" }}
                                                spacing={2}
                                            >
                                                <Button
                                                    onClick={handlesubmit}
                                                    fullWidth={true}
                                                    variant="contained"
                                                >
                                                    Criar
                                                </Button>
                                                <Button
                                                    fullWidth={true}
                                                    variant="outlined"
                                                    onClick={handleClose}
                                                >
                                                    Cancelar
                                                </Button>
                                            </Stack>
                                        </ThemeProvider>
                                    </FormControl>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Backdrop>
                </Card>
            </Container>
        </>
    );
};

//onClick={handleClose}
