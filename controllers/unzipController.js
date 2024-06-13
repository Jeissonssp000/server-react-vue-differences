const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

exports.uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const extractPath = path.join(__dirname, 'extracted_files');

    if (!fs.existsSync(extractPath)) {
      fs.mkdirSync(extractPath);
    }

    fs.createReadStream(filePath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .on('close', () => {
        fs.readdir(extractPath, (err, files) => {
          if (err) {
            return res.status(500).json({ error: 'Error al leer los archivos descomprimidos' });
          }
          res.json({ files });
        });
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'Error al descomprimir el archivo' });
      });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar el archivo' });
  }
}