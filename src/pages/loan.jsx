import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import QRCode from "react-qr-code";
const loan = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [loan, setLoan] = useState("");

    useEffect(() => {
        if (cookies.user === "reader") {
            getLoan();
        } else {
            Router.push("/");
        }
    }, []);

    const getLoan = async () => {
        const data = await axios
            .get(`/selectLoan/${Router.router.state.asPath.substr(6)}`, {
                headers: {
                    authorization: cookies.token,
                },
            })
            .then((respone) => {
                if (respone.data.data != undefined) {
                    const { id, book } = respone.data.data;
                    setLoan(
                        <Card
                            sx={{
                                margin: "0 auto",
                                display: "flex",
                                marginTop: "1%",
                                alignItems: "center",
                                flexDirection: "column",
                                textAlign: "center",
                                padding: "3%",
                            }}
                        >
                            <QRCode
                                size={250}
                                style={{
                                    padding: "5%",
                                    margin: "0 auto",
                                    textAlign: "center",
                                    flexDirection: "column",
                                }}
                                value={id}
                                viewBox={`0 0 256 256`}
                            />
                            <Typography
                                sx={{ margin: "2%" }}
                                variant="h6"
                                gutterBottom
                            >
                                {id}
                            </Typography>
                            <List
                                sx={{
                                    width: "100%",
                                    height: "150px",
                                    overflow: "scroll",
                                    overflowX: "hidden",
                                }}
                            >
                                {book.map((loan) => {
                                    return (
                                        <>
                                            <a href={`/select/${loan.id}`}>
                                                <Divider></Divider>
                                                <Stack
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
                                                            padding: "5%",
                                                            height: "150px",
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
                                })}
                            </List>
                        </Card>
                    );
                }
            });
    };

    return (
        <>
            <Container
                sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "0 auto",
                    justifyContent: "center",
                    height: "90vh",
                }}
                fixed
                maxWidth="md"
            >
                {loan}
            </Container>
        </>
    );
};
export default loan;
