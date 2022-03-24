const request = require("supertest");
const mongoose = require("mongoose");
const {dbConnection} = require("../../config/keys/keys")
const app = require("../../index")
beforeEach((done) => {
    mongoose.connect(dbConnection,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  
describe("test authentification",()=>{
    const data = {
        "userName":"karam",
        "email":"karamkoujan@gmail.com",
        "password":"123456789",
    }
    it("successfull account creation",async()=>{
        await request(app).post("/api/auth/register").send(data).expect(201).then(response=>{
            expect(response.error).toBeFalsy()
        })

    })
    it("successfull login",async()=>{
        await request(app).post("/api/auth/login").send(data).expect(200).then(response=>{
            expect(response.error).toBeFalsy()
        })

    })
    it("unsuccessfull login",async()=>{
        const data = {
            "userName":"karam",
            "email":"karamkoujan@gmail.com",
            "password":"13456789",
        }
        await request(app).post("/api/auth/login").send(data).expect(400).then(response=>{
            expect(response.error).toBeTruthy()
        })

    })
})

afterEach((done) => {
   mongoose.connection.dropDatabase(()=>{
       mongoose.connection.close(()=>done())
   })
}) 