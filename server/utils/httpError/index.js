
class BadRequest extends Error {
    constructor(message){
        super()
        this.error = true 
        this.message = message
        this.statusCode = 400
    }
}
class Forbidden extends Error {
    constructor(message){
        super()
        this.error = true 
        this.message = message
        this.statusCode = 403
    }
}
class NotFound extends Error {
    constructor(message){
        super()
        this.error = true 
        this.message = message
        this.statusCode = 404
    }
}
class ServerError extends Error {
    constructor(message){
        super()
        this.error = true 
        this.message = message
        this.statusCode = 500
    }
}
class UnAuthorized extends Error {
    constructor(message){
        super()
        this.error = true 
        this.message = message
        this.statusCode = 401
    }
}

module.exports = {
    BadRequest,
    Forbidden,
    NotFound,
    ServerError,
    UnAuthorized
}