import {NextFunction, Request,Response} from "express";
interface Context{
  req : Request,
  res : Response,
  next : NextFunction,
  payload?:{userId:string},
}

export default Context 