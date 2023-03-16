const request = require("supertest")
const app = require("../app")

describe("Users API", () => {
    test("Get /user/findall --> array users", async () => {
        return request(app)
            .get("/user/findall")
            .expect(200)
            .then((res)=> {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                username: expect.any(String),
                                email: expect.any(String),
                                password: expect.any(String),
                            }),
                        ]),
                    })
                )
            })
    })

    test("Get /user/findid --> object user", async () => {
        await request(app).post('/auth/register')
        .send({
            username: "testingAcc",
            email: "testingAcc@gmail.com",
            password: "12345"
        })
        const response = 
        await request(app).post('/auth/login')
        .send({
            user: "testingAcc",
            password: "12345"
        })
        const id = response.body.data.id;
        return request(app)
            .get(`/user/findid/${id}`)
            .expect(200)
            .then((res)=> {
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

    test("Put /user/updateacc --> update account", async() => {
        const response = 
        await request(app).post('/auth/login')
        .send({
            user: "testingAcc",
            password: "12345"
        })
        const token = response.body.data.token;
        return request(app).put("/user/updateacc")
        .set("Authorization", `${token}`)
        .send({
            NewUsername: "testingAccUpdate",
            NewEmail: "testingAccUpdate@gmail.com",
            OldPassword: "12345",
            NewPassword: "123"
        })
        .expect(200)
    })

    test("Delete /user/deleteacc --> delete account", async() => {
        const response = 
        await request(app).post('/auth/login')
        .send({
            user: "testingAccUpdate",
            password: "123"
        })
        const token = response.body.data.token;
        return request(app).delete("/user/deleteacc")
        .set("Authorization", `${token}`)
        .expect(200)
    })
})