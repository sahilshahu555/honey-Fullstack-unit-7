const app = require("./index");
const connect = require("./configs/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async (req, res) => {
  
  try {
    await connect();
    console.log("LISTENING ON PORT " + PORT);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});
