import { IAuthUser } from "../users/user.types";
export interface ICommentBody {
  text?: string;
  userInfo?: string | IAuthUser;
  createTime?: Date | string;
  blogId?: string;
  targetId?: string;
  target?: string;
}
