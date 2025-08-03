const path = require("path");
const fs = require("fs");
const querystring = require("querystring");

const postHandler = (req, res) => {
  let allData = "";
  req.on("data", (chunk) => {
    allData += chunk;
  });
  req.on("end", () => {
    const convertedData = querystring.parse(allData);
    const pathFile = path.join(__dirname, "posts.json");

    fs.readFile(pathFile, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("server error");
      } else {
        const posts = JSON.parse(data);
        posts[Date.now()] = convertedData.post.trim();

        fs.writeFile(pathFile, JSON.stringify(posts), (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("server error");
          }
        });
      }
    });
    res.writeHead(302, { Location: "/" });
    res.end();
  });
};
module.exports = postHandler;
