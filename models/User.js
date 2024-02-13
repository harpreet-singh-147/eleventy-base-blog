import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		agreeTerms: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
