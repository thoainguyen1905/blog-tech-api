import Joi from "joi";

export interface ICart {
  name?: string;
  price?: number;
  thumbnail?: string;
  quantity?: number;
  sizes?: string;
  userId?: string;
}

export const cartValidation = (cart: ICart) => {
  return Joi.object({
    name: Joi.string().max(200).required(),
    thumbnail: Joi.string().required(),
    sizes: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    userId: Joi.string().required(),
  }).validate(cart);
};
