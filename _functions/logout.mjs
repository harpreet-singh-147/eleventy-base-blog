export const handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	const cookieString = `token=; HttpOnly; ${
		process.env.NODE_ENV === "production" ? "Secure; SameSite=None; " : ""
	}Domain=cg-eleventy-blog.netlify.app; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

	return {
		statusCode: 200,
		headers: {
			"Set-Cookie": cookieString,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message: "Logged out successfully" }),
	};
};
