const express = require("express");
const app = express();
const mongoose = require("mongoose");
const image = require("./image");
const cors = require("cors");
const multer = require("multer");

const corsOptions = {
  origin: "http://localhost:8008",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/image", express.static("uploads"));

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limiuts: { fileSize: 10 * 1024 * 1024 },
});

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/image", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.error(e));

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

app.post("/image", upload.single("image"), (req, res) => {
  image.create({ url: "/image/" + req.file.filename });
});

app.get("/image", async (req, res) => {
  const images = await image.find({});

  return res.status(200).json({
    result: "SUCCESS",
    images: images,
  });
});

app.listen(3000, () => {
  console.log("3000번 열림");
});
