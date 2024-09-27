const express = require("express");
const cors = require("cors");
const upload = require("./utlis/multer");
const { connection, Filemodel } = require("./db");

const app = express();

app.use(cors());

app.use(express.static("./uploads"));

app.post("/upload", upload.array("file",6), async (req, res) => {
  const { filename } = req.file;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await Filemodel.create({ filename });
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/getimages", async (req, res) => {
  try {
    const imagesdata = await Filemodel.find();
    if (!imagesdata) {
      return res.status(400).json({ message: "No images found" });
    }

    res.status(200).json(imagesdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(8080, async () => {
  try {
    console.log("server is running on port 8080");
  } catch (error) {
    console.log(error);
  }
});
