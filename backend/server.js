const express = require("express");

const app = express();

const PORT = 5000;

app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        service: "DevOps Platform API",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
