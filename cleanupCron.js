const fs = require("fs");
const path = require("path");

const folderPath = "/home/cron";
const now = Date.now();
const daysOld = 30;

if (!fs.existsSync(folderPath)) {
  console.log("Folder not found, skipping cleanup.");
  process.exit(0);
}

fs.readdirSync(folderPath).forEach((file) => {
  const filePath = path.join(folderPath, file);
  const stats = fs.statSync(filePath);
  const ageInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

  if (ageInDays > daysOld) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted old file: ${file}`);
  }
});

console.log("Cleanup complete.");
