import Joi from "joi";
export type IStatusOrder = "complete" | "prepare" | "shipping";

export interface IOrder {
  status?: IStatusOrder;
  thumbnail?: string;
  name?: string;
  quantity?: string;
  price?: string;
  sizes?: string;
  note?: string;
  address?: string;
  createTime?: string;
  userInfo?: string;
}

export const orderValidation = (order?: IOrder) => {
  return Joi.object({
    status: Joi.string().required(),
    thumbnail: Joi.string(),
    price: Joi.number().required(),
    listProduct: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          thumbnail: Joi.string().required(),
          quantity: Joi.number().required(),
          price: Joi.number().required(),
          sizes: Joi.string().required(),
        })
      )
      .required(),
    note: Joi.string().required(),
    address: Joi.string(),
  }).validate(order);
};
