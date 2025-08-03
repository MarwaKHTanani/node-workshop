const fs = require("fs");
const path = require("path");
const publicHandler = require("./publicHandler");
const postHandler = require("./postHandler");

const router = (req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === "/") {
    publicHandler(res, "/public/index.html");
  } else if (url.includes("public")) {
    publicHandler(res, url);
  } else if (url === "/posts" && method === "GET") {
    const filePath = path.join(__dirname, "posts.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Server error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (method === "POST" && url === "/create-post") {
    postHandler(req, res);
  } else {
    res.statusCode = 404;
    res.end("page not found");
  }
};

module.exports = router;
