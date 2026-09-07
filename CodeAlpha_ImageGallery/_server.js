const http = require("http");
const fs = require("fs");
const path = require("path");
const root = "C:\\Users\\hp\\FrameGallery";
const mime = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript" };
http.createServer((req, res) => {
  let filePath = path.join(root, req.url === "/" ? "/index.html" : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
    res.end(data);
  });
}).listen(8642, "0.0.0.0", () => console.log("listening on 0.0.0.0:8642"));
