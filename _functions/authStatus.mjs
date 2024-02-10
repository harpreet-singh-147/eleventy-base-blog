import { verifyToken } from "../utils/jwt";

export const handler = async (event) => {
	try {
		const token = event.headers.cookie
			?.split(";")
			.find((c) => c.trim().startsWith("token="));
		if (!token) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					authenticated: false,
				}),
			};
		}

		const jwt = token.split("=")[1];
		let decoded;

		try {
			decoded = verifyToken(jwt);
		} catch (error) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					authenticated: false,
				}),
			};
		}

		const { userId, firstName } = decoded;

		return {
			statusCode: 200,
			body: JSON.stringify({
				authenticated: true,
				user: {
					userId,
					firstName,
				},
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Server error", error: error.message }),
		};
	}
};
