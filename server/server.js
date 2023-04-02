import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import usersRoutes from "./routes/usersRoute.js";
import transactionRoutes from "./routes/transactionsRoute.js";
import cors from "cors";
import requestRoutes from "./routes/requestRoute.js";
import path from "path";
const app = express();
const PORT = process.env.port || 5000;

dotenv.config();
connectDB();
app.use(cors());
app.use(express.urlencoded());

// app.use(express.json());

app.use("/api/users", express.json(), usersRoutes);
app.use("/api/requests", express.json(), requestRoutes);
app.use("/api/transactions", transactionRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
console.log(process.env.NODE_ENV);
const __dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running");
  });
}
app.listen(
  PORT,
  console.log(`Running on port ${PORT}, mode=${process.env.NODE_ENV}`)
);
