exports.handler = async function (event, context) {
	const value = process.env.OPENWEATHER_API_KEY;

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `Value of OPENWEATHER_API_KEY is ${value}.`,
		}),
	};
};
