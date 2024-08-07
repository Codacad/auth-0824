import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [25, "Name must be less than 25 characters long"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      trim: true,
      minlength: [5, "Password must be at least 5 characters long"],
      maxlength: [500, "Password must be less than 500 characters long"],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

const User = model("User", userSchema);
export default User;
