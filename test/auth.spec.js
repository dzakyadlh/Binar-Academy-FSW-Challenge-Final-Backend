const request = require("supertest")
const app = require("../app")

describe("Auth API", () => {
    test("Register /auth/register --> register account", async() => {
        return await request(app).post('/auth/register')
        .send({
            username: "testingAuth",
            email:"testingAuth@gmail.com",
            password: "12345",
        })
        .expect(200)
        .then(()=> {
            expect.objectContaining({
                data: expect.arrayContaining([
                    expect.objectContaining({
                        username: expect.any(String),
                        email: expect.any(String),
                        password: expect.any(String),
                    }),
                ]),
            })
        })
    })

    test("Login /auth/login --> login account", async() => {
        return await request(app).post('/auth/login')
        .send({
            user: "testingAuth",
            password: "12345",
        })
        .expect(200)
        .then(()=> {
            expect.objectContaining({
                data: expect.arrayContaining([
                    expect.objectContaining({
                        username: expect.any(String),
                        email: expect.any(String),
                        token: expect.any(String),
                    }),
                ]),
            })
        })
    })

    test("ForgotPass /auth/forgotpass --> forgot password account", async() => {
        return await request(app).put("/auth/forgotpass")
        .send({
            email: "testingAuth@gmail.com",
            password: "12345",
        })
        .expect(200)
    })

    test("Delete /user/deleteacc --> update account", async() => {
        const response = 
        await request(app).post('/auth/login')
        .send({
            user: "testingAuth",
            password: "12345",
        })
        const token = response.body.data.token;
        await request(app).delete("/user/deleteacc")
        .set("Authorization", `${token}`)
        .expect(200)
    })
})