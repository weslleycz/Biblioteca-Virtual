import { default as Alert, default as MuiAlert } from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "../api/heroku";
import Router from "next/router";
import { forwardRef, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { theme } from "../styles/theme/materialUi";

const AlertS = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            name: data.get("name"),
            email: data.get("email"),
            telephone: data.get("telephone"),
            category: category,
            password: data.get("password"),
        };
        if (
            user.name === "" ||
            user.email === "" ||
            user.telephone === "" ||
            user.password === ""
        ) {
            Seterror(
                <Alert severity="warning">
                    Você deve preencher todos os campos!
                </Alert>
            );
        } else {
            const create = await axios
                .post("/signupUser", user)
                .then((res) => {
                    handleClick();
                    Router.push("/login");
                })
                .catch((err) => {
                    Seterror(
                        <Alert severity="error">
                            {err.response.data.status}!
                        </Alert>
                    );
                });
        }
    };

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

    const [error, Seterror] = useState("");
    const [category, setCategory] = useState("Aluno");

    const categorys = [{ label: "Aluno" }, { label: "Professor" }];

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    useEffect(() => {
        if (cookies.user != undefined) {
            Router.push("/");
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type={"number"}
                                    required
                                    fullWidth
                                    id="telephone"
                                    label="Telefone"
                                    name="telephone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disableClearable={true}
                                    sx={{ width: "100%" }}
                                    fullWidth={true}
                                    id="combo-box-demo"
                                    defaultValue={"Aluno"}
                                    disablePortal
                                    options={categorys}
                                    renderInput={(params) => (
                                        <TextField
                                            onSelect={() =>
                                                setCategory(
                                                    params.inputProps.value
                                                )
                                            }
                                            {...params}
                                            label="Usuário *"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        {error}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Abrir conta
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Já tem uma conta? Entrar
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <AlertS
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Cadastro feito com sucesso!!!
                </AlertS>
            </Snackbar>
        </ThemeProvider>
    );
}
