import Joi from "joi";

export interface ICategories {
  name: string;
  description?: string;
}

export const categoriesValidation = (categories: ICategories) => {
  return Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    isActive: Joi.boolean().required(),
    thumbnail: Joi.string().required(),
  }).validate(categories);
};
