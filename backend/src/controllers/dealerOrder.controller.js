import { DealerOrder } from "../models/DealerOrder.js";



// Submit a dealer order (authenticated user)
const submitDealerOrderController = async (req, res, next) => {
    try {

        const { name, email, companyName, companyEmail, productName, productId, message } = req.body;
        const { _id: userId } = req.user;

        if (!name || !email || !companyName || !companyEmail || !productName || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await DealerOrder.create({
            userId,
            name,
            email,
            companyName,
            companyEmail,
            productName,
            productId: productId || undefined,
            message,
            deliveryStatus: "pending"
        });

        return res.status(201).json({
            success: true,
            message: "Aapka order place ho chuka hai!"
        });

    } catch (err) {
        next(err);
    }
};



// Get orders for the currently logged-in dealer
const getMyDealerOrdersController = async (req, res, next) => {
    try {

        const userId = req.user._id;
        const orders = await DealerOrder.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: orders });

    } catch (err) {
        next(err);
    }
};



// Get all dealer orders (admin)
const getAllDealerOrdersController = async (req, res, next) => {
    try {

        const orders = await DealerOrder.find().sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: orders });

    } catch (err) {
        next(err);
    }
};



// Update delivery status (admin)
const updateDealerOrderStatusController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { deliveryStatus } = req.body;

        if (!deliveryStatus) {
            return res.status(400).json({ success: false, message: "Delivery status is required" });
        }

        const updatedOrder = await DealerOrder.findByIdAndUpdate(
            id,
            { deliveryStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, data: updatedOrder });

    } catch (err) {
        next(err);
    }
};



// Delete dealer order (admin)
const deleteDealerOrderController = async (req, res, next) => {
    try {

        const { id } = req.params;

        const deleted = await DealerOrder.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order deleted successfully" });

    } catch (err) {
        next(err);
    }
};



export {
    submitDealerOrderController,
    getMyDealerOrdersController,
    getAllDealerOrdersController,
    updateDealerOrderStatusController,
    deleteDealerOrderController
};
