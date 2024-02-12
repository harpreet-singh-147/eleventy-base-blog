import dbConnect from "../utils/dbConnect";

export const handler = async (event) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	await dbConnect();

	const { firstName, surname, email, message, terms } = JSON.parse(event.body);

	if (!firstName || !surname || !email || !message || !terms) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Missing fields" }),
		};
	}

	console.log("Form submission received:", {
		firstName,
		surname,
		email,
		message,
		terms,
	});

	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Form data logged successfully" }),
	};
};
