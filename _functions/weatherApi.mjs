import fetch from "node-fetch";

export const handler = async (event, context) => {
	const API_KEY = process.env.OPENWEATHER_API_KEY;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=leeds&units=metric&appid=${API_KEY}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "An unexpected error occurred.");
		}

		const data = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
