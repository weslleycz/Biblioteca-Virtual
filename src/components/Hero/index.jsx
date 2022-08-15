import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import useMedia from "use-media";
import heroImg from "../../assets/heroImg.svg";
import { theme } from "../../styles/theme/materialUi";
import Styles from "./styles.module.scss";

export const Hero = () => {
    const isWide = useMedia({ minWidth: 720 });
    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: 2 }}>
                <Box sx={{ flexGrow: 2 }}>
                    <Grid container spacing={1} columns={isWide ? 16 : 5}>
                        <Grid xs={8}>
                            <Container
                                sx={{
                                    textAlign: "center",
                                    marginTop: 7,
                                }}
                            >
                                <Typography
                                    sx={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                    variant="h3"
                                    gutterBottom
                                    component="div"
                                >
                                    <strong>
                                        Bem-vindo a sua{" "}
                                        <strong className={Styles.highlighted}>
                                            biblioteca
                                        </strong>{" "}
                                        online
                                    </strong>
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textAlign: "center",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "70%",
                                        margin: "0 auto",
                                        color: "#2b2a2a",
                                    }}
                                    gutterBottom
                                >
                                    body1. Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Quos
                                    blanditiis tenetur unde.
                                </Typography>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        variant="contained"
                                        sx={{ marginTop: 3, width: "50%" }}
                                        fullWidth={true}
                                        size="medium"
                                        disableElevation
                                    >
                                        Cadastre-se
                                    </Button>
                                </ThemeProvider>
                            </Container>
                        </Grid>
                        <Grid sx={{ justifyContent: "center" }} xs={8}>
                            <Image src={heroImg} alt="Logo" />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};
