const express = require("express");
const next = require("next");
const { color } = require("console-log-colors");
const options = require("./src/swagger/config");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();
const { bgGreen, bgMagenta} = color;
const { router } = require("./routes");

app.prepare().then(() => {
    const server = express();

    server.use(express.json({ limit: "100mb" }));
    server.use(express.static("public"));

    server.get("/", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/", req.query);
    });

    server.get("/off", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/off", req.query);
    });

    server.get("/adm", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/adm", req.query);
    });

    server.get("/adm/dashboard", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/dashboardAdm", req.query);
    });

    server.get("/select/*", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/select", req.query);
    });

    server.get("/login", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/login", req.query);
    });

    server.get("/books", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/books", req.query);
    });

    server.get("/cart", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/cart", req.query);
    });

    server.get("/signUp", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/signUp", req.query);
    });

    server.use(
        "/doc",
        swaggerUi.serveFiles(null, options),
        swaggerUi.setup(null, options)
    );

    server.use(router);

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(bgGreen(`🚀 Server started on port:${port}`));
    });
});
