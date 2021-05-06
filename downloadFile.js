require("dotenv/config");
const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

// download a file using fileName and bucketName
// Downloaded file will be stored in download/${fileName}
const downloadFile = (bucketName, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  s3.getObject(params, (err, data) => {
    if (err) throw err;
    else {
      fs.writeFile(`downloads/${fileName}`, data.Body, () => {
        console.log("file downloaded successfully");
      });
    }
  });
};

// get url of a file uploaded to S3 bucket
// fileName is the Key
const getFileURL = (bucketName, fileName) => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: fileName,
  });
  return url;
};
