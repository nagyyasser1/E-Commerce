const fs = require("fs");

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // fs.unlink method to delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        reject(err);
      } else {
        console.log("File deleted successfully");
        resolve();
      }
    });
  });
};

module.exports = deleteFile;
