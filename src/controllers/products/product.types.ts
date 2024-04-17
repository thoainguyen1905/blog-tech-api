import Joi from "joi";

export interface IProduct {
  name?: string;
  description?: string;
  thumbnail?: string;
  images?: Array<string>;
  quantity?: number;
  productType?: string;
  produceCode?: string;
  price?: number;
  sizes?: Array<string>;
}

export const productValidation = (product: IProduct) => {
  return Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().required(),
    thumbnail: Joi.string().required(),
    images: Joi.array(),
    quantity: Joi.number().required(),
    productType: Joi.string(),
    produceCode: Joi.string(),
    price: Joi.number().required(),
    sizes: Joi.array().required(),
  }).validate(product);
};
