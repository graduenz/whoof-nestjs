import * as Joi from 'joi';
import { PetType } from 'src/pets/enums/pet-type.enum';

export interface Pet {
  id: string;
  name: string;
  petType: PetType;
}

export const PetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.number().greater(0).less(5),
});
