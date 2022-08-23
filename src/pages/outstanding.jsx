import { Card } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const outstanding = () => {
    const [cookies, setCookie] = useCookies(["token"]);
    const [login, setLogin] = useState("");

    const getUsers = async () => {
        const data = await axios.get("/getPendency");
        if (data.data.data != undefined) {
            const pendents = data.data.data.map((x) => {
                console.log(x.user);
                return (
                    <>
                        <Card sx={{ padding: "2%" }}>
                            <Divider key={x.user.id}></Divider>
                            <Typography variant="h6" gutterBottom>
                                {x.user.name}
                            </Typography>
                            <strong>E-mail:</strong>
                            <Typography variant="subtitle1" gutterBottom>
                            {x.user.email}
                            </Typography>
                            <strong>Telefone:</strong>
                            <Typography variant="subtitle1" gutterBottom>
                            {x.user.telephone}
                            </Typography>
                        </Card>
                    </>
                );
            });
            setLogin(pendents);
        }
    };

    useEffect(() => {
        if (cookies.user === "adm") {
            getUsers();
        } else {
            Router.push("/");
        }
    }, []);
    return (
        <>
            <Container sx={{ marginTop: "2%" }} maxWidth="sm">
                <Card>{login}</Card>
            </Container>
        </>
    );
};

export default outstanding;
