import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

import {closeMongo, connectToMongo} from "./dbUtils";
import {getBaseServer} from "./server";
import {User, UserDocument} from "./user";

const assert = chai.assert;

// Helper function to authenticate a user and return an authenticated agent
async function authAsUser(
  app: any,
  email: string,
  password: string
): Promise<supertest.SuperAgentTest> {
  const agent = supertest.agent(app);
  const res = await agent.post("/auth/login").send({email, password}).expect(200);
  agent.set("authorization", `Bearer ${res.body.data.token}`);
  return agent;
}

describe("server tests", function () {
  let app: any;
  let clinicianAgent: supertest.SuperAgentTest;
  let testUserId: string;
  let testClinicianId: string;

  beforeAll(async function () {
    // Set required environment variables for testing
    process.env.TOKEN_SECRET = "test-secret-key-for-jwt";
    process.env.TOKEN_ISSUER = "test-issuer";
    process.env.REFRESH_TOKEN_SECRET = "test-refresh-secret";
    process.env.SESSION_SECRET = "test-session-secret";

    // Connect to test database
    process.env.MONGODB_URI = "mongodb://localhost:27017/interview-test";
    await connectToMongo();

    // Get the server app without listening on a port
    app = await getBaseServer(true);
  });

  beforeEach(async function () {
    // Clear all data before each test
    await User.deleteMany({});

    // Create test users
    const patient = await User.register(
      {
        name: "Michael Scott",
        email: "michael@example.com",
        kind: "Patient",
        admin: false,
      } as UserDocument,
      "password"
    );
    testUserId = (patient._id as mongoose.Types.ObjectId).toString();

    const clinician1 = await User.register(
      {
        name: "Jim Halpert",
        email: "jim@example.com",
        kind: "Clinician",
        admin: true,
      } as UserDocument,
      "password"
    );
    testClinicianId = (clinician1._id as mongoose.Types.ObjectId).toString();

    await User.register(
      {
        name: "Dwight Schrute",
        email: "dwight@example.com",
        kind: "Clinician",
        admin: true,
      } as UserDocument,
      "password"
    );

    await User.register(
      {
        name: "Stanley Hudson",
        email: "stanley@example.com",
        kind: "Clinician",
        admin: true,
      } as UserDocument,
      "password"
    );

    // Create authenticated agents for testing
    clinicianAgent = await authAsUser(app, "jim@example.com", "password");
  });

  afterAll(async function () {
    // Clean up after all tests
    await User.deleteMany({});
    await closeMongo();
  });

  it("gets users", async function () {
    const res = await clinicianAgent.get("/users").expect(200);
    assert.lengthOf(res.body.data, 4);

    // Check that all users are returned with correct properties
    const userNames = res.body.data.map((user: any) => user.name).sort();
    assert.deepEqual(userNames, [
      "Dwight Schrute",
      "Jim Halpert",
      "Michael Scott",
      "Stanley Hudson",
    ]);

    // Check that the patient user has correct properties
    const patient = res.body.data.find((user: any) => user.name === "Michael Scott");
    assert.equal(patient.kind, "Patient");
    assert.equal(patient.email, "michael@example.com");
  });

  it("health check works without authentication", async function () {
    const server = supertest(app);
    const res = await server.get("/health").expect(200);
    assert.deepEqual(res.body, {status: "ok"});
  });
});
