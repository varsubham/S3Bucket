require("dotenv/config");
const express = require("express");
const multer = require("multer");
const uuid = require("uuid/v4");
const AWS = require("aws-sdk");
const app = express();

const port = process.env.PORT || 5000;

//AWS object
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// storage
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});

// upload middleware
const upload = multer({ storage }).single("image");

//upload a file endpoint
app.post("/upload", upload, (req, res) => {
  const uploadFile = req.file.originalname.split(".");
  const fileExtension = uploadFile[uploadFile.length - 1];

  // everytime creating a random fileName
  const fileName = `${uuid()}.${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: req.file.buffer,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`listining on port ${port}`);
});
