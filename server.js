const express = require("express");
const next = require("next");
const { color, log } = require('console-log-colors');
const options = require("./src/swagger/config")

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
const { bgGreen,bgMagenta,bgRed,bgYellow,bgCyan } = color;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger/doc.json');

app.prepare().then(() => {

    const server = express();

    server.use(express.json({ limit: "100mb" }));
    server.use(express.static("public"));

    server.get("/api-docs/doc.json", (req, res) => {
        console.log(bgGreen("Doc"));
        res.json(swaggerDocument)
    });

    server.use('/doc', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

    server.get("/", (req, res) => {
        console.log(bgCyan(req.method));
        return app.render(req, res, "/", req.query);
    });
    
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(bgGreen(`🚀 Server started on port:${port}`));
    });
    
});
