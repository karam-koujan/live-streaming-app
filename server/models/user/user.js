let buildMakeUser = function(studentValidator) {
    return (userInfo) => {
      let {error} = studentValidator(userInfo)
      if (error) throw new Error(error)
  
      return userInfo;
    }
  }
  
  module.exports = buildMakeUser; 