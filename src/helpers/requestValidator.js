import Joi from 'joi'
import {error}from '../models/error'

export const validator = (schema) => {
    return (req, res, next) => {
        const ret = Joi.validate(req.body,schema,{});
        if(ret.error){
            next(error(400, ret.error.toString()))
        }else{
            next();
        }
    }
}