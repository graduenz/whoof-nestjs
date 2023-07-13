import * as Joi from 'joi';

export const PetVaccinationSchema = Joi.object({
  petId: Joi.string().required(),
  vaccineId: Joi.string().required(),
});
