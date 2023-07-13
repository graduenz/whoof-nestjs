import { PetType } from '@prisma/client';
import * as Joi from 'joi';

const petTypeValidation = (value, helpers) => {
  if (Object.keys(PetType).indexOf(value) > -1) {
    return value;
  }

  return helpers.error('any.invalid');
};

export const VaccineSchema = Joi.object({
  name: Joi.string().required(),
  petType: Joi.string().custom(petTypeValidation),
  duration: Joi.number().required(),
});
