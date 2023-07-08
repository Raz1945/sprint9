const authMiddleware = (req, res, next) => {
  const headers = req.headers;
  if (headers["x-api-key"] !== "tasksenpai") {
    console.log("Intento de request con api key invalido");
    res.status(401).json({ message: "No estas autorizado para hacer esto" });
    return;
  }
  next();
};