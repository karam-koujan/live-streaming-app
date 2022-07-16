import { ObjectSchema } from "@hapi/joi"


const inputValidation = (schema:ObjectSchema)=>(input:object)=>schema.validateAsync(input);


export default inputValidation;

