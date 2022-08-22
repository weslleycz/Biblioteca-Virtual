import BookIcon from "@mui/icons-material/Book";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Logo from "../../assets/logo.svg";
import { useMedia } from "../../hooks/useMedia";
import { theme } from "../../styles/theme/materialUi";
import { MenuMobile } from "../MenuMobile";
import Styles from "./styles.module.scss";
export const ConnectedContext = createContext();

export const Header = () => {
    const isWide = useMedia("(min-width: 480px)");
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [connected, setConnected] = useState("");
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [userArea, setUserArea] = useState("");
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        removeCookie("token");
        removeCookie("user");
        setConnected(
            <div>
                <ThemeProvider theme={theme}>
                    <Stack spacing={1} direction="row">
                        <Button href="/signUp" variant="contained">
                            Cadastre-se
                        </Button>
                        <Button href="/login" variant="text">
                            Entrar
                        </Button>
                    </Stack>
                </ThemeProvider>
            </div>
        );
        router.push("/");
    };

    useEffect(() => {
        if (cookies.user === undefined) {
            setConnected(
                <div>
                    <ThemeProvider theme={theme}>
                        <Stack spacing={1} direction="row">
                            <Button href="/signUp" variant="contained">
                                Cadastre-se
                            </Button>
                            <Button href="/login" variant="text">
                                Entrar
                            </Button>
                        </Stack>
                    </ThemeProvider>
                </div>
            );
        } else {
            setConnected(
                <Avatar sx={{ bgcolor: "#5fac87" }} onClick={handleClick}>
                    {char[Math.floor(Math.random() * char.length)]}
                </Avatar>
            );
            if (cookies.user === "adm") {
                setUserArea(
                    <a href="/adm/dashboard">
                        <MenuItem>
                            <ListItemIcon>
                                <ViewStreamIcon fontSize="small" />
                            </ListItemIcon>
                            Dashboard
                        </MenuItem>
                    </a>
                );
            } else {
                setUserArea(
                    <div>
                        <a href="/loans">
                            <MenuItem>
                                <ListItemIcon>
                                    <BookIcon fontSize="small" />
                                </ListItemIcon>
                                Empréstimos
                            </MenuItem>
                        </a>
                        <a href="/cart">
                            <MenuItem>
                                <ListItemIcon>
                                    <ShoppingCartIcon fontSize="small" />
                                </ListItemIcon>
                                Carrinho
                            </MenuItem>
                        </a>
                    </div>
                );
            }
        }
    }, []);
    return (
        <header className={Styles.headerContainer}>
            <ConnectedContext.Provider value={{ setConnected }}>
                <div className={Styles.headerContent}>
                    {isWide ? (
                        <>
                            <Link href="/">
                                <Image height="60%" src={Logo} alt="Logo" />
                            </Link>
                            <nav>
                                <a
                                    href="/"
                                    className={
                                        router.route === "/"
                                            ? Styles.active
                                            : ""
                                    }
                                >
                                    Home
                                </a>
                                <a
                                    href="/books"
                                    className={
                                        router.route === "/books"
                                            ? Styles.active
                                            : ""
                                    }
                                >
                                    Livros
                                </a>
                            </nav>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    marginLeft: "1rem;",
                                }}
                            >
                                <MenuMobile />
                            </div>
                        </>
                    )}
                    {connected}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                        }}
                        anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                        }}
                    >
                        <Divider />
                        {userArea}
                        <MenuItem onClick={() => handleLogout()}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sair
                        </MenuItem>
                    </Menu>
                </div>
            </ConnectedContext.Provider>
        </header>
    );
};
