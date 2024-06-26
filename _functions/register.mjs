import bcrypt from "bcrypt";
import dbConnect from "../utils/dbConnect";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	await dbConnect();

	const { firstName, username, password, agreeTerms } = JSON.parse(event.body);

	if (!firstName || !username || !password || !agreeTerms) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Missing fields" }),
		};
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newUser = await User.create({
			firstName,
			username,
			password: hashedPassword,
			agreeTerms,
		});

		const payload = { userId: newUser._id, firstName: newUser.firstName };
		const token = generateToken(payload);

		const cookieString = `token=${token}; Domain=.harpreetduggal.dev; Path=/; HttpOnly; Secure; SameSite=None;`;

		return {
			statusCode: 201,
			headers: {
				"Set-Cookie": cookieString,
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin":
					"https://cg-11ty-blog.harpreetduggal.dev",
			},
			body: JSON.stringify({
				message: "User registered successfully",
				firstName: newUser.firstName,
			}),
		};
	} catch (error) {
		let message = "Server error";
		if (error.code === 11000) {
			message = "Username already exists. Please choose a different username.";
		}
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: message,
				error: error.message,
			}),
		};
	}
};
