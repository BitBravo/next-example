import { Schema, model, Model } from 'mongoose';
import IUser from "../../types/user";


type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>({
  first_name: String,
  last_name: String,
});

export default model<IUser, UserModel>("users") || model<IUser, UserModel>("users", userSchema);
