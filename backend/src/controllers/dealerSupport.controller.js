import { DealerSupport } from "../models/DealerSupport.js";


// Submit a support ticket (authenticated dealer)
const submitDealerSupportController = async (req, res, next) => {
    try {
        const { topic, subject, message } = req.body;
        const { _id: userId, name, email } = req.user;

        if (!topic || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        await DealerSupport.create({
            userId,
            name: name || "Dealer",
            email: email || "",
            topic,
            subject,
            message,
            status: "open"
        });

        return res.status(201).json({ success: true, message: "Support ticket submitted successfully!" });

    } catch (err) {
        next(err);
    }
};


// Get all support tickets for the logged-in dealer
const getMyDealerSupportController = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tickets = await DealerSupport.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: tickets });
    } catch (err) {
        next(err);
    }
};


// Get all support tickets (admin)
const getAllDealerSupportController = async (req, res, next) => {
    try {
        const tickets = await DealerSupport.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: tickets });
    } catch (err) {
        next(err);
    }
};


// Update ticket status (admin)
const updateDealerSupportStatusController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }

        const updated = await DealerSupport.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        return res.status(200).json({ success: true, data: updated });

    } catch (err) {
        next(err);
    }
};


// Delete support ticket (admin)
const deleteDealerSupportController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await DealerSupport.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        return res.status(200).json({ success: true, message: "Ticket deleted successfully" });

    } catch (err) {
        next(err);
    }
};


export {
    submitDealerSupportController,
    getMyDealerSupportController,
    getAllDealerSupportController,
    updateDealerSupportStatusController,
    deleteDealerSupportController
};
