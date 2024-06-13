const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');
const { uploadFileToStorage, uploadUnzippedFileToStorage, uploadFilesRoutes } = require('../src/firebase');

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
            const uploadedFiles = [];
            for (const file of files) {
              const localFilePath = path.join(extractPath, file);
              const remoteFilePath = `unzipped/${file}`;
              const fileUrl = await uploadUnzippedFileToStorage(localFilePath, remoteFilePath);
              uploadedFiles.push({ name: file, path: fileUrl });
            }
            await uploadFilesRoutes(uploadedFiles)
            res.status(200).json({ resp: true, msg: "Archivos guardados consultar lista de archivos" })
          } catch (error) {
            throw new Error("Error al subir los archivos a Storage o guardar en Firestore")
          }
        });
      })
      .on('error', (err) => {
        throw new Error("No se pudo descomprimir el archivo")
      });
  } catch (err) {
    next(err)
  }
}
