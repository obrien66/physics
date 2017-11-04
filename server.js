var http = require("http")
var fs = require("fs")
var dotenv = require("dotenv")
// load .env var
dotenv.load()

// if no .env port run on 8000
var port = process.env.PORT || 8000
var reqURL = process.env.URL || "/"

// start server
http.createServer((req, res) => {
	// check that method is GET
	if (req.method === "GET") {
		// if listing requested
		if (req.url === reqURL) {
			// list directory contents
			fs.readdir(__dirname + "/public", (err, items) => {
				// if theres an issue, say theres an issue
				if (err) {
					res.writeHead(500, "Internal Server Error", {"content-type": "text/html"})
					res.end("<h1>500</h1><p>Internal Sever Error</p>")
				}
				else {
					res.writeHead(200, {"content-type": "text/html"})
					res.write("<h1>Physics Questions</h1><ul>")
					items.map(item => {
						res.write(`<li><a href="${reqURL + item}">${item}</a></li>`)
					})
					res.write("</ul>")
					res.end()
				}

			})
		}
		else {
			var file = req.url

			fs.readFile(__dirname + file, (err, data) => {
				if (err) {
					res.writeHead(404, "File Not Found", {"content-type": "text/html"})
					res.end("<h1>404</h1><p>File: " + file + " not found</p>")
				}
				else {
					var filename = file.split("/")
					filename = filename[filename.length - 1]

					res.writeHead(200, {
					  	'Content-Type': 'application/pdf',
					  	'Content-Disposition': `attachment; filename=${filename}`,
					  	'Content-Length': Buffer.byteLength(data, "utf8")
					})
					res.end(data)
				}
			})
		}
	}
	else {
		res.writeHead(405, "Method not allowed", {"content-type": "text/html"})
		res.end("<h1>405</h1> <p>Method not allowed</p>")
	}
}).listen(port)
console.log("http://127.0.0.1:"+port+reqURL)