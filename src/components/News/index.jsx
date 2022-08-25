import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Line from "../../assets/line.svg";
import { useMedia } from "../../hooks/useMedia";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Styles from "./styles.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme/materialUi";
import { Book } from "../Book";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "../../api/heroku";
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const News = () => {
    const isWide = useMedia("(min-width: 480px)");

    const [news, setNews] = useState(
        <Box
            sx={{
                marginRight: 4,
                backgroundImage:
                    "linear-gradient(to bottom, #f9fff5 50%, #ffffff)",
                marginTop: "auto",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                marginBottom: 3,
                boxShadow: "1px 4px 9px rgba(0, 0, 0, 0.25)",
                border: "1px solid #eee2e2;",
            }}
        >
            <Box sx={{ paddingTop: "8.5%" }}>
                <img
                    height={400}
                    width={300}
                    className={Styles.item}
                    src={``}
                    alt=""
                ></img>
            </Box>
            <Box>
                <Typography variant="h6" gutterBottom component="div">
                    <strong>item.title</strong>
                </Typography>
            </Box>
            <Rating
                name="text-feedback"
                readOnly
                precision={0.5}
                value={0}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
            />
            <Box>
                <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                            marginBlockEnd: "8.5%",
                            marginTop: "10px",
                        }}
                        size="medium"
                        disableElevation
                        variant="contained"
                    >
                        Adicionar ao carrinho
                    </Button>
                </ThemeProvider>
            </Box>
        </Box>
    );

    const getNews = async () => {
        let data = await axios.get("/getBook");
        const books = data.data.data.reverse().map((item) => {
            return (
                <>
                <Book 
                dashboard={false}
                item={item}></Book>
                </>
            );
        });
        setNews(books);
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <>
            <div className="carosel-conteiner">
                <Container>
                    <Typography
                        sx={{ marginTop: "3.8rem",
                        marginBlockEnd:"1rem",
                        fontStyle:"italic"
                     }}
                        variant="h6"
                        gutterBottom
                    >
                        Adicionados Recentemente
                    </Typography>
                    <Image src={Line} alt=""></Image>
                    <Carousel ssr={true} responsive={responsive}>
                        {news}
                    </Carousel>
                </Container>
            </div>
        </>
    );
};
