const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const { customInvalidJSONError, sendError } = require('./src/services/utils/ErrorHandling.')

const playersRouter = require("./src/routes/players");
const loginRouter = require("./src/routes/login");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use((error, req, res, next) => {
    sendError(res, customInvalidJSONError)
})
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/players", playersRouter);
app.use("/login", loginRouter);

module.exports = app;