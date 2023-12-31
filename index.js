const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require('slugify')
const replaceTemplate = require('./replaceTemplate')

//Blocking, Synchronous way
// const ans = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(ans);
// const textOut = `This is what we know about Avacado: ${ans}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written');

// Non-blockin, Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     console.log(data1);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
//       console.log(data2);
//       fs.writeFile(`./txt/final.txt`, `${data1}\n${data2}`,'utf-8', err => {
//         console.log('File has been written')
//       })
//     });
//   });
// });

// console.log("written..");


const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);

  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);

  } else {

    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page Not Found </h1>");
  }
});

server.listen(3000);
