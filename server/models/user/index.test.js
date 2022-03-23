const buildMakeUser = require("./index");



describe("testing user model :",()=>{

    it("build user successfully",()=>{
        const user = {
            userName : "karam",
            email :"karamkoujandev@gmail.com",
            password:"123456789",
            followers : [{id:"1"}],
            followings : [{id:"1"}],
            profileImg :"profile image",
            profileBackgroundImg :"background profile image"
           }
       expect(buildMakeUser(user)).toEqual(user)

    })
})