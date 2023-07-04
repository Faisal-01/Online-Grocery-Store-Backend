require('dotenv').config();
require("express-async-errors");
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
const subcategoryRouter = require("./routes/subcategory");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const requestedProductRouter = require("./routes/requestedProduct");
const paymentRouter = require("./routes/payment");
const adminLoginRouter = require("./routes/adminLogin");
const connectDB = require("./db/database");
const path = require("path");

const cors = require("cors");
const notFound = require('./notFound');
const error = require('./error');
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  //   optionSuccessStatus: 200,
};

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/category', categoryRouter)
app.use("/api/v1/subcategory", subcategoryRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/request", requestedProductRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/admin/login", adminLoginRouter);

app.use(notFound);
app.use(error)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
          console.log(`Server is listening on PORT ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();