import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
	{
		firstName: { type: String, required: true },
		surname: { type: String, required: true },
		email: {
			type: String,
			required: true,
			match: [/.+\@.+\..+/, "Please fill a valid email address"],
		},
		message: { type: String, required: true },
		terms: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
