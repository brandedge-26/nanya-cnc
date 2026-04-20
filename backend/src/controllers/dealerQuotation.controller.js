import { DealerQuotation } from "../models/DealerQuotation.js";


// Submit a quotation request (dealer)
const submitQuotationController = async (req, res, next) => {
    try {

        const { productName, productId, message } = req.body;
        const { _id: userId, name, email } = req.user;

        if (!productName) {
            return res.status(400).json({ success: false, message: "Product is required" });
        }

        await DealerQuotation.create({
            userId,
            name,
            email,
            productName,
            productId: productId || undefined,
            message: message || "",
        });

        return res.status(201).json({ success: true, message: "Quotation request submitted successfully!" });

    } catch (err) {
        next(err);
    }
};


// Get quotations for the logged-in dealer
const getMyQuotationsController = async (req, res, next) => {
    try {

        const userId = req.user._id;
        const quotations = await DealerQuotation.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: quotations });

    } catch (err) {
        next(err);
    }
};


// Get all quotations (admin)
const getAllQuotationsController = async (req, res, next) => {
    try {

        const quotations = await DealerQuotation.find().sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: quotations });

    } catch (err) {
        next(err);
    }
};


// Update quotation status (admin)
const updateQuotationStatusController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updated = await DealerQuotation.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }

        return res.status(200).json({ success: true, data: updated });

    } catch (err) {
        next(err);
    }
};


// Delete quotation (admin)
const deleteQuotationController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const deleted = await DealerQuotation.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Quotation not found" });
        }

        return res.status(200).json({ success: true, message: "Quotation deleted successfully" });

    } catch (err) {
        next(err);
    }
};


export {
    submitQuotationController,
    getMyQuotationsController,
    getAllQuotationsController,
    updateQuotationStatusController,
    deleteQuotationController,
};
