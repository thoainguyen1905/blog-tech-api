import xlsx from "xlsx";
import fs from "fs";
import path from "path";

const convertDistrict = async (filepath?: string, writePath?: string) => {
  const filePath = filepath;

  const workbook = xlsx.readFile(filePath);

  const sheetName = workbook.SheetNames[0]; // Giả sử chỉ có một sheet

  // Lấy dữ liệu từ sheet đầu tiên
  const worksheet = workbook.Sheets[sheetName];

  // Chuyển đổi dữ liệu từ sheet sang JSON
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Đường dẫn đến thư mục gốc của dự án
  const projectDir = process.cwd();

  // Đường dẫn đến thư mục data
  const dataDir = path.join(projectDir, "data");

  // Tạo thư mục data nếu nó chưa tồn tại
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  // Lưu dữ liệu JSON vào file trong thư mục data
  const jsonFilePath = path.join(dataDir, writePath);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
};

export const convertDatatoObjEn = async (writePath?: string) => {
  const projectDir = process.cwd();

  const dataDir = path.join(projectDir, "data");
  const jsonFilePath = path.join(dataDir, writePath);
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      const transformedData = jsonData.map((item) => {
        return {
          code: item["Mã"],
          name: item["Tên"],
          level: item["Cấp"],
          codeDistrict: item["Mã QH"],
          districtName: item["Quận Huyện"],
          codeProvince: item["Mã TP"],
          provinceName: item["Tỉnh / Thành Phố"],
        };
      });

      fs.writeFileSync(writePath, JSON.stringify(transformedData, null, 2));
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
};

export default convertDistrict;
