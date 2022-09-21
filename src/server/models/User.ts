import { Schema, model, Model } from 'mongoose';
import IUser from "types/user";

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  first_name: String,
  last_name: String,
});


export const Blog = (() => {
  try {
    return model<IUser, UserModel>("users")
  } catch (error) {
    return model<IUser, UserModel>("users", userSchema);
  }
})()