import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Book from "../assets/book.svg";
import M from "../assets/M.svg";
import box from "../assets/box.svg";
import warning from "../assets/warning.svg";

const dashboardAdm = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [deshbord, setDeshbord] = useState(<></>);
    useEffect(() => {
        if (cookies.user === "adm") {
            setDeshbord(
                <Container sx={{ marginTop: "4%" }} maxWidth="sm">
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={6}>
                            <a href="/create">
                            <Card
                                sx={{
                                    height: "200px",
                                    textAlign: "center",
                                    margin: "0 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    transition: "color 0.1s",
                                    cursor: "pointer",
                                    ":hover":{
                                        background:"#9dc78c"
                                     }
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6" gutterBottom>
                                        Livros
                                    </Typography>
                                    <Image
                                        height="100%"
                                        width="110%"
                                        src={Book}
                                    ></Image>
                                </Stack>
                            </Card>
                            </a>
                        </Grid>
                        <Grid item xs={6}>
                            <a href="/deliver">
                            <Card
                                sx={{
                                    height: "200px",
                                    textAlign: "center",
                                    margin: "0 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    transition: "color 0.1s",
                                    cursor: "pointer",
                                    ":hover":{
                                        background:"#9dc78c"
                                     }
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6" gutterBottom>
                                    Entregar Livros
                                    </Typography>
                                    <Image
                                        height="100%"
                                        width="110%"
                                        src={box}
                                    ></Image>
                                </Stack>
                            </Card>
                            </a>
                        </Grid>
                        <Grid item xs={6}>
                            <a href="/giveback">
                            <Card
                                sx={{
                                    height: "200px",
                                    textAlign: "center",
                                    margin: "0 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    transition: "color 0.1s",
                                    cursor: "pointer",
                                    ":hover":{
                                        background:"#9dc78c"
                                     }
                                }}
                            >
                                <Stack spacing={2}>
                                    <Typography variant="h6" gutterBottom>
                                    Recolher Livros
                                    </Typography>
                                    <Image
                                        height="100%"
                                        width="110%"
                                        src={M}
                                    ></Image>
                                </Stack>
                            </Card>
                            </a>
                        </Grid>
                        <Grid item xs={6}>
                        <a href="/outstanding">
                            <Card
                                sx={{
                                    height: "200px",
                                    textAlign: "center",
                                    margin: "0 auto",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    transition: "color 0.1s",
                                    cursor: "pointer",
                                    ":hover":{
                                        background:"#9dc78c"
                                     }
                                }}
                            >
                                 <Stack spacing={2}>
                                    <Typography variant="h6" gutterBottom>
                                    Pendentes
                                    </Typography>
                                    <Image
                                        height="100%"
                                        width="110%"
                                        src={warning}
                                    ></Image>
                                </Stack>
                            </Card>
                            </a>
                        </Grid>
                    </Grid>
                </Container>
            );
        } else {
            Router.push("/adm");
        }
    }, []);

    return <>{deshbord}</>;
};

export default dashboardAdm;
