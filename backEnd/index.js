const express = require("express");
const app = express();
const { UserModel } = require("./models/user.model");
const { PaymentModel } = require("./models/payment.model");
const productController = require("./controllers/productController");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  
  try {
    await UserModel.create({
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
    res.status(201).send({ status: "success" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).send({ msg: "Sign up first", status: "error" });
  } else {
    if (password === user.password) {
      res.status(201).send({ msg: "login successfully", status: "success" });
    } else {
      res
        .status(401)
        .send({ msg: "Login failed, invalid credentials", status: "error" });
    }
  }
});

app.post("/payment", async (req, res) => {
  const { price, email } = req.body;

  try {
    await PaymentModel.create({
      price,
      email,
    });
    res
      .status(201)
      .send({ status: "success", msg: "Payment done successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.use("/products", productController);
module.exports = app;
