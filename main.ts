import routes from "./src/routes";
import * as bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/models/mongooseDB";
const express = require("express");
const app = express();
import connectSocket from "./src/controllers/socket/socket-io";
import crawlerWeb from "./src/helpers/crawler";
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
connectDB();
// crawlerWeb();

// connectSocket();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
