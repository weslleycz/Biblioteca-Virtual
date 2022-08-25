import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import axios from "../api/heroku";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Moment from "react-moment";
import { useMedia } from "../hooks/useMedia";
import Styles from "./loans.module.scss";

const loans = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const isWide = useMedia("(min-width: 480px)");
    const [login, setLogin] = useState("");
    const [loans, setLoans] = useState(<></>);

    const getLoans = async () => {
        axios
            .get(`/getLoans`, {
                headers: {
                    authorization: cookies.token,
                },
            })
            .then((response) => {
                const data = response.data.data.reverse().map((loan) => {
                    return (
                        <>
                            <Divider></Divider>
                            <a href={`/loan/${loan.id}`}
                            key={loan.id}
                            >
                                <ListItem sx={{ width: "100%" }}>
                                    <Typography variant="body2" gutterBottom>
                                        {loan.id}
                                    </Typography>

                                    {loan.statusLoan !=
                                    "Aguardando a retirada" ? (
                                        <Moment
                                            style={{
                                                color:"#5fac87",
                                                marginLeft: "52%",
                                            }}
                                            format="DD/MM/YYYY"
                                        >
                                            {loan.startDate}
                                        </Moment>
                                    ) : (
                                       ""
                                    )}
                                </ListItem>
                                <div
                                    className={
                                        loan.statusLoan ===
                                        "Aguardando a retirada"
                                            ? Styles.entregue
                                            : loan.statusLoan === "Devolvido"
                                            ? Styles.concluido
                                            : Styles.pendent
                                    }
                                >
                                    <strong>{loan.statusLoan}</strong>
                                </div>
                            </a>
                        </>
                    );
                });
                setLoans(data);
            });
    };

    useEffect(() => {
        if (cookies.user === "reader") {
            getLoans();
            setLogin(
                <>
                    <Typography
                        variant="h5"
                        sx={{
                            paddingTop: "2%",
                            paddingLeft: "2%",
                            paddingRight: "2%",
                        }}
                        gutterBottom
                    >
                        Meus Empréstimos
                    </Typography>
                    <Divider></Divider>
                    <ListItem sx={{ width: "100%" }}>
                        <Typography
                            variant="body1"
                            sx={{
                                paddingTop: "2%",
                            }}
                            gutterBottom
                        >
                            <strong>Código:</strong>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                paddingTop: "2%",
                                marginLeft: isWide ? "0%" : "75%",
                            }}
                            gutterBottom
                        >
                            <strong>Data de entrega:</strong>
                        </Typography>
                    </ListItem>
                </>
            );
        } else {
            Router.push("/");
        }
    }, []);

    return (
        <>
            <Container component="main" maxWidth="md">
                <Card
                    sx={{
                        marginTop: 3,
                        alignItems: "center",
                    }}
                >
                    {login}
                    {loans}
                </Card>
            </Container>
        </>
    );
};

export default loans;
