const File = require("../models/File.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cloudinary = require("../configs/CloudinaryConfig.js");
const fs = require("fs");
const { nanoid } = require("nanoid");
const sendMail = require("../service/MailSender");

router.post("/upload", upload.single('file'), async (req, res) => {
    console.log("Route hit: /api/upload");
    try {
        const { expiry = 'never', emailTo, emailFrom } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // 1. Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
        });

        // 2. Delete temp file
        fs.unlinkSync(req.file.path);

        // 3. Generate shortId
        const shortId = nanoid(6);

        // 4. Prepare expiry (optional)
        let expiryDate = null;
        if (expiry !== 'never') {
            const duration = parseInt(expiry); // expects number of days
            if (!isNaN(duration)) {
                expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + duration);
            }
        }

        // 5. Save to DB
        const createdFile = await File.create({
            shortId,
            cloudinaryUrl: result.secure_url,
            fileName: req.file.originalname,
            size: req.file.size,
            expiry: expiryDate,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // 6. Optional: Send email with download link
        if (emailTo && emailFrom) {
            const downloadLink = `https://${req.get("host")}/api/${shortId}`;
            await sendMail({
                emailTo,
                emailFrom,
                link: downloadLink,
                fileName: req.file.originalname,
                size: req.file.size
            });
        }

        // 7. Respond
        res.status(201).json({
            message: "File uploaded successfully",
            shortId,
            url: `https://${req.get("host")}/api/${shortId}`,
            expiry: expiryDate
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
});

module.exports = router;