const buildMakeUser = require("./index");



describe("testing user model :",()=>{

    it("build user successfully",()=>{
        const inputUser = {
            userName : "karam",
            email :"karamkoujandev@gmail.com",
            password:"123456789",
            followers : [{id:"1"}],
            followings : [{id:"1"}],
            profileImg :"profile image",
            profileBackgroundImg :"background profile image",
            streamKey:"123456556",
            rules:["noracism"],
            aboutMe:"my name is karam a full stack javascript dev",
            socialMedia:[{name:"twitter",link:"https://twitter.com/karamkaku"}],
           }
        const outputUser = {...inputUser,error:false}
       expect(buildMakeUser(inputUser)).toEqual(outputUser)

    })
})