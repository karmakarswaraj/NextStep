import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust path to your User model

const isAuthenticatedUser = async (req, res, next) => {
    try {
        // Get token from cookies
        const { token } = req.cookies;
    
        // If no token, user is not authenticated
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login...",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Log the decoded token to debug
        console.log("Decoded JWT:", decoded);
        
        // If the decoded token doesn't have the _id field, return an error
        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Find the user by _id
        const user = await User.findById(decoded.userId);

        // If user not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Attach user to the request object for use in subsequent middleware/routes
        req.user = user;
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(401).json({
            success: false,
            message: "Please login...",
        });
    }
};


export default isAuthenticatedUser;
