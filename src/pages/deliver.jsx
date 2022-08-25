import SendIcon from "@mui/icons-material/Send";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "../api/heroku";
import Router from "next/router";
import { useEffect, useState,forwardRef } from "react";
import { useCookies } from "react-cookie";
import { theme } from "../styles/theme/materialUi";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const deliver = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [deliver, setDeliver] = useState(<></>);
    const [loan, setLoan] = useState("");
    const [code, setCode] = useState(<></>);
    const [open, setOpen] = useState(false);

    const updateLoan = async () => {
        if (loan != "") {
            const data = await axios.put(`/updateLoan/${loan}`);
            setCode("");
            handleClick();
            setTimeout(handleClose, 1000);
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };


    const getLoan = async (event) => {
        event.preventDefault();
        const code = new FormData(event.currentTarget);
        setLoan(code.get("code"));
        const data = await axios
            .get(`/selectLoan/${code.get("code")}`, {
                headers: {
                    authorization: cookies.token,
                },
            })
            .then((respone) => {
                const { book } = respone.data.data;
                console.log(book);
                const res = book.map((loan) => {
                    return (
                        <>
                            <a href={`/select/${loan.id}`}>
                                <Divider></Divider>
                                <Stack
                                    key={loan.id}
                                    direction="row"
                                    divider={
                                        <Divider
                                            orientation="horizontal"
                                            flexItem
                                        />
                                    }
                                    spacing={2}
                                >
                                    <img
                                        style={{
                                            height: "160px",
                                            padding: "5%",
                                        }}
                                        src={loan.cover}
                                    ></img>
                                    <Typography
                                        sx={{
                                            margin: "0 auto",
                                            paddingTop: "17%",
                                        }}
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        {loan.title}
                                    </Typography>
                                </Stack>
                            </a>
                        </>
                    );
                });
                setCode(
                    <div
                        style={{
                            width: "100%",
                            height: "400px",
                            overflow: "scroll",
                            overflowX: "hidden",
                        }}
                    >
                        {res}
                    </div>
                );
            });
    };

    useEffect(() => {
        if (cookies.user === "adm") {
            setDeliver(
                <Container
                    sx={{
                        marginTop: "2%",
                    }}
                    maxWidth="sm"
                >
                    <form
                        style={{
                            padding: "3%",
                        }}
                        onSubmit={getLoan}
                    >
                        <Stack direction="row">
                            <TextField
                                size="small"
                                fullWidth={true}
                                name="code"
                                placeholder="Código do emprestimo"
                            />
                            <ThemeProvider theme={theme}>
                                <Button type="submit" variant="contained">
                                    Buscar
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </form>
                </Container>
            );
        } else {
            Router.push("/adm");
        }
    }, []);
    return (
        <>
            <Container
                sx={{
                    marginTop: "3%",
                }}
                maxWidth="sm"getLoan
            >
                <Card>
                    <Card sx={{ minWidth: 275, height: 400 }}>
                        {deliver}
                        {code}
                    </Card>
                </Card>
                <Card>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            onClick={updateLoan}
                            fullWidth={true}
                            endIcon={<SendIcon />}
                        >
                            Liberar livros
                        </Button>
                    </ThemeProvider>
                </Card>
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
                        Feito!!!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default deliver;
