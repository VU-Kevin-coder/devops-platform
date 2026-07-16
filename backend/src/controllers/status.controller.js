const os = require("os");

exports.getStatus = (req, res, next) => {
  try {
    res.json({
      status: "online",
      service: "DevOps Platform API",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      hostname: os.hostname(),
      pid: process.pid,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
