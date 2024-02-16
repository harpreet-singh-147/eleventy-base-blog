export const handler = async (event, context) => {
	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method Not Allowed" }),
		};
	}

	const cookieString = `token=; HttpOnly; Secure; SameSite=None; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

	return {
		statusCode: 200,
		headers: {
			"Set-Cookie": cookieString,
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "https://cg-eleventy-blog.netlify.app",
			"Access-Control-Allow-Credentials": "true",
		},
		body: JSON.stringify({ message: "Logged out successfully" }),
	};
};
