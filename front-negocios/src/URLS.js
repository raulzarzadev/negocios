export const UPLOAD_IMAGE_SERVICE =
  process.env.ENVIROMENT === "development"
    ? "http://localhost:4042/upload"
    : "http://http://138.68.233.95:4042";
