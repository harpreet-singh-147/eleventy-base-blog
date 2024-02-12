import dbConnect from "../utils/dbConnect";
import Contact from "../models/ContactMessages";

export const handler = async (event) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	try {
		await dbConnect();

		const { firstName, surname, email, message, terms } = JSON.parse(
			event.body
		);

		if (
			!firstName ||
			!surname ||
			!email ||
			!message ||
			!terms ||
			terms !== "Agreed"
		) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "Missing fields" }),
			};
		}

		await Contact.create({
			firstName,
			surname,
			email,
			message,
			terms: terms === "Agreed",
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Thank you for your message!" }),
		};
	} catch (error) {
		if (error.name === "ValidationError") {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "Validation failed",
				}),
			};
		}
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Failed to save form data",
			}),
		};
	}
};
