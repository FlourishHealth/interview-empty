import {program} from "commander";
import {logger} from "ferns-api";

import {closeMongo, connectToMongo} from "./dbUtils";
import {User, UserDocument} from "./user";

const DEFAULT_PASSWORD = "password";

const main = async (): Promise<void> => {
  // Drop all collections and their indices
  await User.collection.drop();
  logger.info("Dropped users collection and indices");

  // Create a 2 staff and 2 patient user.
  const staff1 = await User.register(
    {
      name: "Staff 1",
      email: "staff1@example.com",
      kind: "Clinician",
      admin: true,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created staff1: ${staff1._id}, email: ${staff1.email}, password: ${DEFAULT_PASSWORD}`
  );

  const staff2 = await User.register(
    {
      name: "Staff 2",
      email: "staff2@example.com",
      kind: "Clinician",
      admin: true,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created staff2: ${staff2._id}, email: ${staff2.email}, password: ${DEFAULT_PASSWORD}`
  );
  const patient1 = await User.register(
    {
      name: "Patient 1",
      email: "patient1@example.com",
      kind: "Patient",
      admin: false,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created patient1: ${patient1._id}, email: ${patient1.email}, password: ${DEFAULT_PASSWORD}`
  );
  const patient2 = await User.register(
    {
      name: "Patient 2",
      email: "patient2@example.com",
      kind: "Patient",
      admin: false,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created patient2: ${patient2._id}, email: ${patient2.email}, password: ${DEFAULT_PASSWORD}`
  );

  const staff3 = await User.register(
    {
      name: "Staff 3",
      email: "staff3@example.com",
      kind: "Clinician",
      admin: true,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created staff3: ${staff3._id}, email: ${staff3.email}, password: ${DEFAULT_PASSWORD}`
  );

  const patient3 = await User.register(
    {
      name: "Patient 3",
      email: "patient3@example.com",
      kind: "Patient",
      admin: false,
    } as UserDocument,
    DEFAULT_PASSWORD
  );
  logger.info(
    `Created patient3: ${patient3._id}, email: ${patient3.email}, password: ${DEFAULT_PASSWORD}`
  );
};

function run(): void {
  program
    .description(
      "Loads the database with the data for the interview API. Warning: This will delete all existing data in the database."
    )
    .parse(process.argv);

  connectToMongo()
    .then(() => main().then(() => closeMongo()))
    .catch((error) => console.error(error));
}

if (require.main === module) {
  run();
}
