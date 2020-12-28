import fs from "fs";

export default async (file) => {
  const { createReadStream, filename } = await file;

  try {
    let stream = createReadStream();
    let path = "public/images/" + filename;

    stream
      .on("error", (error) => {
        if (stream.truncated) fs.unlinkSync(path);
        throw new Error("error");
      })
      .pipe(fs.createWriteStream(path))
      .on("finish", () => console.log("finish"));
    return file;
  } catch (error) {
    console.log(error);
  }
};
