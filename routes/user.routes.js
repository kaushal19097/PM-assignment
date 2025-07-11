const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const extractMetadata = require('../utils/extractMetadata');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('📁 uploads folder created at:', uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'test123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/upload', authenticate, upload.single('media'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const media = extractMetadata(file);

    const user = new User({
      name,
      email,
      media
    });

    await user.save();

    res.status(200).json({ 
      message: 'Upload and save successful',
      user,
      downloadUrl: `http://localhost:5000/api/user/download/${file.filename}`
    });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.get('/uploads', authenticate, async (req, res) => {
  try {
    const users = await User.find({}, {
      name: 1,
      email: 1,
      media: 1
    }).sort({ 'media.uploadTime': -1 });

    const updated = users.map(user => ({
      ...user._doc,
      downloadUrl: `http://localhost:5000/api/user/download/${user.media.filename}`
    }));

    res.status(200).json(updated);
  } catch (error) {
    console.error('Failed to fetch uploads:', error);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

router.get('/download/:filename', authenticate, (req, res) => {
  const filePath = path.join(uploadPath, req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download failed:', err);
        res.status(500).json({ error: 'Download failed' });
      }
    });
  });
});

module.exports = router;
