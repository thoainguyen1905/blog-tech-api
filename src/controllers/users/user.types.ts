import Joi from "joi";
interface IAuthUser {
  email?: string;
  password?: string;
  avatar?: string;
  name?: string;
  birthday?: string;
  bio?: string;
  id?: string;
  createTime?: Date | string;
}
interface ISignUp {
  email?: string;
  password?: string;
}

export { IAuthUser, ISignUp };

export const userSignInSchema = (user: ISignUp) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }).validate(user);
};

export const passwordSchema = (Ipassword) => {
  return Joi.object({
    currentPassword: Joi.string().min(4).required(),
    newPassword: Joi.string().min(4).required(),
  }).validate(Ipassword);
};
