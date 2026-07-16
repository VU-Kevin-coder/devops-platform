const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

const healthRoutes = require("./routes/health.routes");
const statusRoutes = require("./routes/status.routes");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

app.use("/api/health", healthRoutes);
app.use("/api/status", statusRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
