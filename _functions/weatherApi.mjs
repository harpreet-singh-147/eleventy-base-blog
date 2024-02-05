import fetch from "node-fetch";

exports.handler = async (event, context) => {
	const API_KEY = process.env.OPENWEATHER_API_KEY;
	console.log("API Key:", API_KEY);

	const url = `https://api.openweathermap.org/data/2.5/weather?q=leeds&units=metric&appid=${API_KEY}`;
	console.log("Request URL:", url);

	try {
		const response = await fetch(url);
		console.log("Response status:", response.status);

		if (!response.ok) {
			const errorData = await response.json();
			console.log("Error response:", errorData);
			throw new Error(errorData.message || "An unexpected error occurred.");
		}

		const data = await response.json();
		console.log("API response data:", data);

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		console.log("Catch block error:", error.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
