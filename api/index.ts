import routes from "../src/routes";
import * as bodyParser from "body-parser";
import cors from "cors";
import convertDistrict, {
  convertDatatoObjEn,
} from "../src/configs/convert-district";
import "dotenv/config";
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
import connectDB from "../src/configs/connect-DB";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
connectDB();
// crawlerWeb();

// connectSocket();
// convertDistrict("province.xls", "province.json");
// convertDistrict("district.xls", "district.json");
// convertDistrict("tower.xls", "tower.json");

// convertDatatoObjEn("tower.json");

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
