require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());

app.use(cors({ origin: process.env.REACT_APP_URL }));

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const productRouter = require("./routes/product.routes");
app.use("/api", productRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
