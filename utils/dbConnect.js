import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	console.log("Attempting to connect to MongoDB");
	if (cached.conn) {
		console.log("Using cached MongoDB connection");
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		console.log("Initializing new MongoDB connection");
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	} else {
		console.log("Waiting on existing MongoDB connection promise");
	}
	cached.conn = await cached.promise;
	console.log("Connected to MongoDB");
	return cached.conn;
}

export default dbConnect;
