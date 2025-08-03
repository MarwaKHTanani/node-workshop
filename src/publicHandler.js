const path = require("path");
const fs = require("fs");

const publicHandler = (res, url) => {
  const filepath = path.join(__dirname, "..", url);
  const ext = path.extname(filepath);

  const extentionType = {
    ".html": "text/html",
    ".css": "text/css",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".json": "application/json",
    ".jpg": "image/jpg",
  };
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("server error");
    } else {
      res.writeHead(200, { "Content-Type": extentionType[ext] });
      res.end(data);
    }
  });
};
module.exports = publicHandler;
