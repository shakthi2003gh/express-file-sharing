const express = require("express");
const bcrypt = require("bcrypt");
const { File } = require("../models/file");
const { upload } = require("../middleware/multer");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  const { path, originalname } = req.file;
  const { password } = req.body;

  const fileData = { path, originalname };

  if (!!password) {
    fileData.password = await bcrypt.hash(password, 10);
  }

  const file = await File.create(fileData);

  res.render("index", { fileLink: `${req.headers.origin}/files/${file.id}` });
});

module.exports = router;
