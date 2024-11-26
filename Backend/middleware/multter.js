import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");

export const multipleUpload = multer({ storage }).fields([
    { name: "profilePicture", maxCount: 1 }, 
    { name: "resume", maxCount: 1 }, 
  ]);