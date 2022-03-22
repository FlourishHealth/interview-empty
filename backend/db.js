const fs = require("fs");

let USER_PATH = "./database/user.json";
let SCHEDULE_PATH = "./database/schedule.json";

// Should only be used for tests.
function setDBPaths(userPath, schedulePath) {
  USER_PATH = userPath;
  SCHEDULE_PATH = schedulePath;
}

function randomId(length = 12) {
  let text = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const User = {
  async read() {
    const rawData = await fs.promises.readFile(USER_PATH);
    return JSON.parse(rawData || {});
  },

  async list() {
    // DB stores them keyed by ID. Return an array for listing instead.
    return Object.values(await User.read());
  },
};

module.exports = { User, setDBPaths };
