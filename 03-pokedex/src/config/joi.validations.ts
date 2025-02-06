
import * as Joi from 'joi';

export const JoiValidationsSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
})