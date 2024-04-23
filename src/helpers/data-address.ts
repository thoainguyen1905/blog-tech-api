import fs from "fs";
import path from "path";
const addressUtils = () => {
  const projectDir = process.cwd();
  var provinces: any = [];
  var districts: any = [];
  var towers: any = [];
  const dataDir = path.join(projectDir, "data");
  const pathDistrict = path.join(dataDir, "district.json");
  const pathProvince = path.join(dataDir, "province.json");
  const pathTower = path.join(dataDir, "tower.json");
  fs.readFile(pathProvince, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);

      provinces = jsonData;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
  fs.readFile(pathDistrict, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);

      districts = jsonData;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
  fs.readFile(pathTower, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);

      towers = jsonData;
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
  return { provinces, districts, towers };
};

export default addressUtils;
