import { User } from "../models/User.js";



// GET ALL USERS CONTROLLER
const getAllUsersController = async (req, res, next) => {
    try {

        const users = await User.find({ role: "user" }).select("_id name email provider").sort({ createdAt: -1 });
        
        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (err) {
        next(err);
    }
}




// DELETE USER CONTROLLER
const deleteUserController = async (req, res, next) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        // check user in db
        if (!user) {
            throw new Error("User not found!");
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted!"
        });

    } catch (err) {
        next(err);
    }
}




export {
    getAllUsersController,
    deleteUserController
}