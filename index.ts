import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(res);
  res.send(`<h1> hellow wormsda</h1>`);
});

app.get("/about", (req, res) => {
  res.send(
    `<h1> Hello World i am testing nice to meet you! this an about page</h1>`
  );
});

app.listen(3000, () => {
  console.log("server is running at " + 3000);
});
