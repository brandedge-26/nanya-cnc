import { DealerRequest } from "../models/DealerRequest.js";
import { User } from "../models/User.js";




// Get Dealer request status
const getDealerStatus = async (req, res, next) => {
    try {

        const { _id: userId } = req.user;

        const dealerRequestStatus = await DealerRequest.findOne({ userId }).select("status");

        if (!dealerRequestStatus) {
            return res.status(200).json({
                success: true,
                data: { status: "idle" }
            });
        }

        return res.status(200).json({
            success: true,
            data: dealerRequestStatus
        });

    } catch (err) {
        next(err);
    }
}




// GET ALL DEALER REQUESTS CONTROLLER
const getAllDealerRequestController = async (req, res, next) => {
    try {

        const dealerRequests = await DealerRequest.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: dealerRequests
        });

    } catch (err) {
        next(err);
    }
}




// UPDATE DEALER STATUS CONTROLLER
const updateDealerStatusController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const updatedRequest = await DealerRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Dealer request not found"
            });
        }

        // Sync user role with dealer request status
        if (updatedRequest.userId) {
            const newRole = status === "accept" ? "dealer" : "user";
            await User.findByIdAndUpdate(updatedRequest.userId, { role: newRole });
        }

        return res.status(200).json({
            success: true,
            data: updatedRequest
        });

    } catch (err) {
        next(err);
    }
}


// DELETE DEALER REQUEST CONTROLLER
const deleteDealerRequestController = async (req, res, next) => {
    try {

        const { id } = req.params;

        const deletedRequest = await DealerRequest.findByIdAndDelete(id);

        if (!deletedRequest) {
            return res.status(404).json({
                success: false,
                message: "Dealer request not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Dealer request deleted successfully"
        });

    } catch (err) {
        next(err);
    }
}


// GET PENDING DEALER REQUESTS COUNT
const getPendingDealerRequestCountController = async (req, res, next) => {
    try {

        const count = await DealerRequest.countDocuments({ status: "pending" });

        return res.status(200).json({
            success: true,
            data: { count }
        });

    } catch (err) {
        next(err);
    }
}


// DEALER REQUEST CONTROLLER
const dealerRequestController = async (req, res, next) => {
    try {

        const { name, email, companyName, companyEmail, message } = req.body;
        const { _id: userId } = req.user;

        if (!name || !email || !companyName || !companyEmail || !message) {
            return;
        }


        await DealerRequest.create({
            userId,
            name,
            email,
            companyName,
            companyEmail,
            message,
            status: "pending"
        });


        return res.status(201).json({
            success: true,
        });

    } catch (err) {
        next(err);
    }
}





export {
    getDealerStatus,
    getAllDealerRequestController,
    updateDealerStatusController,
    deleteDealerRequestController,
    getPendingDealerRequestCountController,
    dealerRequestController
}