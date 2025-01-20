require("dotenv").config();
const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const uuid = require("uuid").v4;

exports.s3Upload = async (file, subfolder, uniqueFileID) => {
  const s3client = new S3Client();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${subfolder}/${uniqueFileID}-${file.originalname}`,
    Body: file.buffer,
  };
  return s3client.send(new PutObjectCommand(param));
};
exports.s3Delete = async (filename, subfolder) => {
  const s3client = new S3Client();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${subfolder}/${filename}`,
  };
  return s3client.send(new DeleteObjectCommand(param));
};
exports.s3GetSignedUrl = async (filename, subfolder) => {
  const s3client = new S3Client();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${subfolder}/${filename}`,
  };
  const command = new GetObjectCommand(param);
  const url = await getSignedUrl(s3client, command, { expiresIn: 3600 });
  return url;
};
