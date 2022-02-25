const express = require("express");
const PORT = 3000;

const app = express();
const { sequelize } = require("./lib/databaseConnection");
const HttpException = require("./exceptions/httpException");
const { initRoutes } = require("./routes");
const bodyParser = require("body-parser");
const passport = require("passport");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initRoutes(app);
require("./utils/passportConfig")(passport);
sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync({ force: true });
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/test", (req, res) => {
  res.json({
    message: "test successful",
  });
});

//Not Found
app.use((req, res, next) => {
  const err = new HttpException(404, "Route doesnot exist");

  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  err.success = false;
  err.status = err.status || 500;
  err.message = err.message || "Something went wrong";
  err.data = err.data || err.stack || null;

  res.status(err.status).json({
    success: err.success,
    status: err.status,
    message: err.message,
    data: err.data,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
