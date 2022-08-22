import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import * as React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

import avatarADM from "../assets/adm.svg";
import { theme } from "../styles/theme/materialUi";

const ADM = () => {
    const [warning, setWarning] = useState("");
    const [loginScrim, setloginScrim] = useState(<></>);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    React.useEffect(() => {
        if (cookies.user === undefined || cookies.user === "") {
            setloginScrim(
                <ThemeProvider theme={theme}>
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
                                <Image src={avatarADM} alt="Logo" />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nome"
                                    name="username"
                                    autoComplete="username"
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
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            );
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("username") != "" || data.get("password") != "") {
            const login = await axios
                .post("/loginADM", {
                    username: data.get("username"),
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
                        setCookie("token", data.data.token);
                        setCookie("user", "adm");
                        Router.push("/adm/dashboard");
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

    if (cookies.user === "adm") {
        Router.push("/adm/dashboard");
    }
    return <>{loginScrim}</>;
};

export default ADM;
