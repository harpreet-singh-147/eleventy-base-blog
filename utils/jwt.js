import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = "1m";

export const generateToken = (payload) => {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

export const verifyToken = (token) => {
	const decoded = jwt.verify(token, JWT_SECRET);
	return decoded;
};
