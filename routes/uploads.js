const express = require("express");
const { upload } = require("../middleware/multer");

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  res.send("hello");
});

module.exports = router;
