const express = require("express");
const next = require("next");
const { color } = require("console-log-colors");
const options = require("./src/swagger/config");
const {upPendency}=require("./src/webhooks/upPendency")
const swaggerAutogen = require('swagger-autogen')()
const cors = require("cors");
const cron = require("node-cron");
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

    const corsOptions = {
        origin : "*", 
        credentials : true  
 }

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

    server.get("/loan/*", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/loan", req.query);
    });

    server.get("/loans", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/loans", req.query);
    });

    server.get("/create", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/create", req.query);
    });

    server.get("/deliver", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/deliver", req.query);
    });

    server.get("/outstanding", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/outstanding", req.query);
    });

    server.get("/giveback", (req, res) => {
        console.log(bgMagenta(req.method));
        return app.render(req, res, "/giveback", req.query);
    });

    server.use(
        "/doc",
        swaggerUi.serve,
        swaggerUi.setup(null, options)
    );

    server.options('*', cors(corsOptions));

    server.use(router);

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    cron.schedule("0 */10 * * *", () => {
        upPendency()
    });

    server.listen(port, () => {
        console.log(bgGreen(`🚀 Server started on port:${port}`));
    });

});
