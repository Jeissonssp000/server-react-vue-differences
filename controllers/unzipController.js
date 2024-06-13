const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const { uploadFileToStorage } = require('../src/firebase');

exports.uploadFile = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const extractPath = path.join(__dirname, 'extracted_files');
    const remoteFileName = `uploads/${req.file.originalname}`;

    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath);
    }

    fs.createReadStream(filePath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .on('close', () => {
        fs.readdir(extractPath, async (err, files) => {
          if (err) {
            throw new Error("Error al leer los archivos descomprimidos");
          }
          try {
            await uploadFileToStorage(filePath, remoteFileName);
            res.json({ files });
          } catch (error) {
            res.status(500).json({ error: 'Error al subir el archivo a Storage' });
          }
        });
      })
      .on('error', (err) => {
        throw new Error("No se pudo descomprimir el archivo");
      });
  } catch (err) {
    next(err)
  }
}
