import mongoose, {Document, Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Interfaces
export interface UserType {
  kind: "Patient" | "Clinician";
  name: string;
  email: string;
  admin: boolean;
}

export interface UserDocument extends UserType, Document {}

const userSchema = new Schema<UserDocument>(
  {
    kind: {type: String, required: true, enum: ["Patient", "Clinician"]},
    name: {type: String, required: true},
    // This should have unique: true, but leaving it for simplicity.
    email: {type: String, required: true},

    // Requirement for ferns-api.
    admin: {type: Boolean, required: true, default: false},
  },
  // Throw errors if passing in extra fields instead of silently ignoring them.
  {strict: "throw", toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

// Use the user model for authentication.
userSchema.plugin(passportLocalMongoose, {
  usernameUnique: true,
  usernameField: "email",
  usernameCaseInsensitive: true,
});

// Create the moel for the user.
export const User = mongoose.model<UserDocument>("User", userSchema);
