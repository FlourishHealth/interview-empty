const express = require("express");
const { User } = require("./db");
const cors = require("cors");
const moment = require("moment-timezone");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

app.get("/users", async (req, res) => {
  return res.json({ users: await User.list() });
});

if (require.main === module) {
  app.listen(PORT);
  console.info(`Listening on PORT ${PORT}`);
}

module.exports = { app };
