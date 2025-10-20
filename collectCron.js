const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "home", "cron");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const data = [
  { id: 1, name: "Safira", value: Math.floor(Math.random() * 1000) },
  { id: 2, name: "Aries", value: Math.floor(Math.random() * 1000) },
  { id: 3, name: "Huawei", value: Math.floor(Math.random() * 1000) },
];

const now = new Date();
const dateStr = `${String(now.getMonth() + 1).padStart(2, "0")}${String(
  now.getDate()
).padStart(2, "0")}${now.getFullYear()}`;
const hourStr = `${String(now.getHours()).padStart(2, "0")}.00`;

const filename = `cron_${dateStr}_${hourStr}.csv`;
const filePath = path.join(folderPath, filename);

const header = "id,name,value\n";
const csvData =
  header +
  data.map((item) => `${item.id},${item.name},${item.value}`).join("\n");

fs.writeFileSync(filePath, csvData);
console.log(`Data collected and saved to ${filePath}`);
