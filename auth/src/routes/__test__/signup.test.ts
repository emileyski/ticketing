import request from "supertest";
import { app } from "../../app";

// it("returns a 201 on successful signup", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);
// });

// it("returns a 400 with an invalid email", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "alskdflaskjfd",
//       password: "password",
//     })
//     .expect(400);
// });

// it("returns a 400 with an invalid password", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "alskdflaskjfd",
//       password: "p",
//     })
//     .expect(400);
// });

// it("returns a 400 with missing email and password", async () => {
//   await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//     })
//     .expect(400);

//   await request(app)
//     .post("/api/users/signup")
//     .send({
//       password: "alskjdf",
//     })
//     .expect(400);
// });

// it("disallows duplicate emails", async () => {
//   await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);

//   await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(400);
// });

// it("sets a cookie after successful signup", async () => {
//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);

//   expect(response.get("Set-Cookie")).toBeDefined();
// });
it("returns a 201 on successful signup", async () => {
  const cookie = await global.signin();

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  const currentUserData = currentUserResponse.body.currentUser;

  expect(currentUserData).toMatchObject({
    id: expect.any(String),
    email: expect.any(String),
    iat: expect.any(Number),
  });
});

it("returns a 201 on successful signup 2", async () => {
  // Sign up and get the cookie
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const cookie = signupResponse.get("Set-Cookie");

  // Make a request with the obtained cookie
  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie) // Pass the cookie here
    .expect(200);
});
