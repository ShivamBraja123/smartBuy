const fs = require('fs');
const path = require('path');

exports.s3Upload = async image => {
  try {
    if (!image) {
      return { imageUrl: '', imageKey: '' };
    }

    const uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + '-' + image.originalname;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, image.buffer);

    return {
      imageUrl: `http://localhost:3000/uploads/${fileName}`,
      imageKey: fileName
    };
  } catch (err) {
    console.error(err);
    return {
      imageUrl: '',
      imageKey: ''
    };
  }
};