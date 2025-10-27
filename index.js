const app = require("http");

const server = app.createServer((req, res) => {
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(
  //     JSON.stringify({
  //       data: "Hello World!",
  //     })
  //   );
  if (req.method == "GET" && req.url == "/") {
    res.end(
      JSON.stringify({
        data: "Hello World i am testing nice to meet you! ",
      })
    );
  }
  if (req.method == "GET" && req.url == "/about") {
    res.end(
      //   JSON.stringify({
      //     data: "Hello World i am testing nice to meet you! this an about page",
      //   })
      `<h1> Hello World i am testing nice to meet you! this an about page</h1>`
    );
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server is running at " + 3000);
});
