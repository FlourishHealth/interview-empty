const chai = require("chai");
const supertest = require("supertest");
const { app } = require("./server");
const { setDBPaths, Schedule } = require("./db");
const fs = require("fs");
const assert = chai.assert;

// Use test data so we don't mess up the normal data.
const USER_PATH = "./database/user.test.json";

describe("server tests", function () {
  let server;
  beforeEach(function () {
    // Copy fixtures over test database, so we restore it to the same point each run.
    fs.copyFileSync(`${USER_PATH}.fixture`, USER_PATH);
    server = supertest(app);
  });

  it("gets users", async function () {
    const res = await server.get("/users").expect(200);
    assert.lengthOf(res.body.users, 4);
    assert.deepEqual(res.body.users, [
      { id: "123", kind: "patient", name: "Michael Scott" },
      {
        id: "abc",
        kind: "clinician",
        name: "Jim Halpert",
      },
      { id: "cde", kind: "clinician", name: "Dwight Schrute" },
      {
        id: "efb",
        kind: "clinician",
        name: "Stanley Hudson",
      },
    ]);
  });
});
