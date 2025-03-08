const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Initialize S3 Client (AWS SDK v3)
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

// Configure Multer Storage with S3
const upload = multer({
    storage: multerS3({
        s3: s3, // ✅ Use S3Client
        bucket: process.env.AWS_S3_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname.replace(/\s/g, "-")}`;
            cb(null, filename);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    }
});

// Export Upload Middleware
module.exports = { upload };
