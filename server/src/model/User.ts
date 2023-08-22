import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isUserVerified: boolean;
  verifyToken: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unquie: true },
  password: { type: String },
  isUserVerified: { type: Boolean, default: false },
  verifyToken: { type: String },
});

export default model<IUser>("User", UserSchema);
