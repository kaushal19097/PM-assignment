
const path = require('path');

const extractMetadata = (file) => {
  return {
    filename: file.filename,
    type: file.mimetype.startsWith('image') ? 'image' : 'video',
    extension: path.extname(file.originalname),
    size: file.size,
    uploadTime: new Date()
  };
};

module.exports = extractMetadata;
