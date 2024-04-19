const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e5);
      cb(null, file.fieldname + "-" + uniqueSuffix +".pdf");
    },
  });
  
  const limits = { fileSize: 1024 * 1024, files: 16 };
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter,
  });

  module.exports.myMulter = upload.fields([
    { name: "regSemFiles", maxCount: 8 },
    { name: "suppSemFiles", maxCount: 8 },
  ]);