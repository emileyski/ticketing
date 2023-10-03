import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}
jest.mock("../nats-wrapper");
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(7); // Генерируем случайную строку
  const domain = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"]; // Выбираем случайный домен
  const randomDomain = domain[Math.floor(Math.random() * domain.length)];
  return `${randomString}@${randomDomain}`;
}
const randomString = () => Math.random().toString(36).substring(7); // Генерируем случайную строку

global.signin = function (): string[] {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: randomString(),
    email: generateRandomEmail(),
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
