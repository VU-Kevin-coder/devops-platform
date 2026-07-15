const express = require("express");

const app = express();

app.use(express.json());


app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        service: "DevOps Platform API",
        version: "1.0.0"
    });
});


module.exports = app;
