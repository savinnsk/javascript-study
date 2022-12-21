const {describe , it} = require('mocha');
const request =  require('supertest')
const app = require("./api")
const assert = require("assert")

describe("API suit test" , ()=>{


    describe("/contact" , ()=>{
        it("should request the contact page and return HTTP status 200", async ()=>{
            const res = await request(app)
            .get("/contact")
            .expect(200)
            assert.deepEqual(res.text , "contact page")
        })
    })

    describe("/hello" , ()=>{
            it("should request an inexistent route /hi and redirect to /hello", async ()=>{
                const res = await request(app)
                .get("/hi")
                .expect(200)
                assert.deepEqual(res.text , "hello")
        })
    })

    describe("/login" , ()=>{
        it("should login successfully on the login route and return HTTP Status 200", async ()=>{
            const res = await request(app)
            .post("/login")
            .send({username: "savio" , password:"123"})
            .expect(200)
            assert.deepEqual(res.text , "logging has success")
    })

    it("should unauthorized a request when requesting it using wrong credentials and return HTTP status 401", async ()=>{
        const res = await request(app)
        .post("/login")
        .send({username: "savinnsk" , password:"123"})
        .expect(401)
        assert.deepEqual(res.text , "login failed")
})
})
})