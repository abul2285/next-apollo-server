const path = require("path");
const imageExtensions = require("image-extensions");

export default (value) => {
  if (typeof value !== "string") return null;

  const extension = path.extname(value).slice(1);
  if (imageExtensions.includes(extension)) return value;

  return null;
};
