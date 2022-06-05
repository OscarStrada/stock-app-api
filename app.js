require("dotenv").config();
const { equal } = require("assert");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://OscarStrada:${process.env.MONGODB_PASSWORD}@development.mtexc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log("Conexión exitosa a la base de datos =)");
    app.listen(port, () => {
      console.log(`Server listening on port:${port}`);
    });
  })
  .catch((err) => console.log(err));

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

app.post("/api/v1/products", (req, res, next) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((result) => {
      res.status(201).json({ ok: true });
    })
    .catch((err) => console.log(err));
});
