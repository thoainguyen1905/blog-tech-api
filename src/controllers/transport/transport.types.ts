import Joi from "joi";

export const deliveryStaffValidation = (delivery: any) => {
  return Joi.object({
    phoneShop: Joi.string().max(12).required(),
    phoneReceiver: Joi.string().max(12).required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    shopName: Joi.string(),
    receiver: Joi.string().required(),
    price: Joi.number().required(),
    code: Joi.string(),
    status: Joi.number().required(),
    type: Joi.string(),
    weight: Joi.number(),
    staffInfor: Joi.string(),
  }).validate(delivery);
};
