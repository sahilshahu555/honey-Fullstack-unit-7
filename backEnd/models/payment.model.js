const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: { type: String, required: true },
  email: { type: String, required: true },
});

const PaymentModel = mongoose.model("payment", paymentSchema);


module.exports = { PaymentModel };
