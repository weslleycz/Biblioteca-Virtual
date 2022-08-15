import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import useMedia from "use-media";
import heroImg from "../../assets/heroImg.svg";
import Styles from "./styles.module.scss";

export const Hero = () => {
    const isWide = useMedia({ minWidth: 720 });
    return (
        <>
            <Container maxWidth="lg" sx={{marginTop: 2}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1} columns={isWide ? 16 : 5}>
                        <Grid xs={8}>
                            <Container
                                sx={{
                                    textAlign: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    marginTop: 5,
                                }}
                            >
                                <Typography
                                    sx={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                    variant="h2"
                                    gutterBottom
                                    component="div"
                                >
                                    <strong>
                                        Bem vindo a sua{" "}
                                        <strong className={Styles.highlighted}>
                                            biblioteca
                                        </strong>{" "}
                                        online
                                    </strong>
                                </Typography>
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
