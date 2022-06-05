require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hola mundo</h1>`);
  console.log("Petición recibida");
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
