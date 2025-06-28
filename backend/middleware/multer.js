import multer from "multer"
//
//const storage = multer.memoryStorage();
//export const singleUpload = multer({storage}).single("file");
//

export const singleUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB for file
    fieldSize: 10 * 1024 * 1024, // 10MB max for each text field
  },
}).single("file");
