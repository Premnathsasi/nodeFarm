const fs = require("fs");

//Blocking, Synchronous way
// const ans = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(ans);
// const textOut = `This is what we know about Avacado: ${ans}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File Written');

// Non-blockin, Asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    console.log(data1);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
      console.log(data2);
      fs.writeFile(`./txt/final.txt`, `${data1}\n${data2}`,'utf-8', err => {
        console.log('File has been written')
      })
    });
  });
});

console.log("written.");
