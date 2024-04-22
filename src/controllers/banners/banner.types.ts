import Joi from "joi";

export interface IBanner {
  name?: string;
  description?: string;
  imageUrl?: string;
  redirect?: string;
}

export const bannerValidation = (banners: IBanner) => {
  return Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string().required(),
    redirect: Joi.string(),
  }).validate(banners);
};
