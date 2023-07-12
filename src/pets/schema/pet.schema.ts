import * as Joi from 'joi';
import { PetType } from 'src/pets/enums/pet-type.enum';

export const PetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.number().greater(PetType.Unspecified).less(PetType.Other),
});
