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

	console.log("NODE_ENV:", process.env.NODE_ENV);

	await dbConnect();

	const { username, password } = JSON.parse(event.body);

	if (!username || !password) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Username and password are required" }),
		};
	}

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: "User not found" }),
			};
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return {
				statusCode: 401,
				body: JSON.stringify({ message: "Invalid credentials" }),
			};
		}

		const payload = { userId: user._id, firstName: user.firstName };
		const token = generateToken(payload);

		const cookieString = `token=${token}; HttpOnly; Secure; SameSite=None; Path=/`;

		return {
			statusCode: 200,
			headers: {
				"Set-Cookie": cookieString,
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin":
					"https://cg-11ty-blog.harpreetduggal.dev",
			},
			body: JSON.stringify({
				message: "Login successful",
				firstName: user.firstName,
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Server error",
				error: error.message,
			}),
		};
	}
};
