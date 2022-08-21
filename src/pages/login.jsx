import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import leitor from "../assets/leitor.svg";
import { theme } from "../styles/theme/materialUi";

export default function Login() {
    const [warning, setWarning] = useState("");
    const [cookies, setCookie] = useCookies(["token"]);
    const [connected, setConnected] = useState("");

    useEffect(() => {
        if (cookies.user === "" || cookies.user === undefined) {
            setConnected(
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                bgcolor: "#16c09b",
                                width: "105px",
                                height: "105px",
                            }}
                        >
                            <Image src={leitor} alt="Logo" />
                        </Avatar>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {warning}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Entrar
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signUp" variant="body2">
                                    Não tem uma conta? Cadastre-se
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            );
        } else {
            Router.push("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("email") != "" || data.get("password") != "") {
            const login = await axios
                .post("/loginUser", {
                    email: data.get("email"),
                    password: data.get("password"),
                })
                .catch((err) => {
                    if (err.response.data.status != "Não registrado!") {
                        setWarning(
                            <Alert severity="error">
                                {err.response.data.status}
                            </Alert>
                        );
                    } else {
                        setWarning(
                            <Alert severity="warning">
                                {err.response.data.status}
                            </Alert>
                        );
                    }
                })
                .then((data) => {
                    if (data != undefined) {
                        setCookie("token", data.data.token, {});
                        setCookie("user", "reader", {});
                        Router.back();
                    }
                });
        } else {
            setWarning(
                <Alert severity="warning">
                    Você deve preceder todos os campos.
                </Alert>
            );
        }
    };

    return <ThemeProvider theme={theme}>{connected}</ThemeProvider>;
}
