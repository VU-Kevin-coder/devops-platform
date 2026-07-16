const os = require("os");

exports.getHealth = (req, res, next) => {
  try {
    res.json({
      status: "healthy",
      uptime: Math.round(process.uptime()),
      environment: process.env.NODE_ENV || "development",
      hostname: os.hostname(),
      pid: process.pid,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
