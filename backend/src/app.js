const express = require("express");

const app = express();

app.use(express.json());

const healthRoutes = require("./routes/health.routes");

const statusRoutes = require("./routes/status.routes");

app.use("/api/health", healthRoutes);

app.use("/api/status", statusRoutes);


module.exports = app;
