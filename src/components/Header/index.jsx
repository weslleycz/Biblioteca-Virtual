import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import Logo from "../../assets/logo.svg";
import { theme } from "../../styles/theme/materialUi";
import Styles from "./styles.module.scss";

export const Header = () => {
    return (
        <header className={Styles.headerContainer}>
            <div className={Styles.headerContent}>
                <Image height="60%" src={Logo} alt="Logo" />
                <nav>
                    <a href="#" className={Styles.active}>
                        Home
                    </a>
                    <a href="#">Sobre</a>
                </nav>
                <div>
                    <ThemeProvider theme={theme}>
                        <Stack spacing={1} direction="row">
                            <Button variant="contained">Cadastre-se</Button>
                            <Button variant="text">Entrar</Button>
                        </Stack>
                    </ThemeProvider>
                </div>
            </div>
        </header>
    );
};
