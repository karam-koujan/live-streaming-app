let buildMakeUser = function(studentValidator) {
    return (userInfo) => {
      let {error} = studentValidator(userInfo)
      
      if (error) return {error:true}
  
      return {...userInfo,error:false};
    }
  }
  
  module.exports = buildMakeUser; 