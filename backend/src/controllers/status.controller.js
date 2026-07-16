exports.getStatus = (req, res, next) => {
  try {
    res.json({
      status: "online",
      service: "DevOps Platform API",
      version: "1.0.0"
    });
  } catch (error) {
    next(error);
  }
};
