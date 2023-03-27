const express = require("express");
const bcrypt = require("bcrypt");
const { File } = require("../models/file");

const router = express.Router();

router.route("/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const file = await File.findById(req.params.id);

  if (!!file.password) {
    const { password } = req.body;
    if (!password) return res.render("password");

    const isValid = await bcrypt.compare(password, file.password);
    if (!isValid) return res.render("password", { error: true });
  }

  file.downloadCount++;
  await file.save();

  res.download(file.path, file.originalname);
}

module.exports = router;
