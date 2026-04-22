import { Consultation } from "../models/Consultation.js";



// get all consultations
const getAllConsultationsController = async (req, res, next) => {
    try {

        const consultations = await Consultation.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: consultations
        });

    } catch (err) {
        next(err);
    }
};



// submit consultation
const submitConsultationController = async (req, res, next) => {
    try {

        const { name, email, machine, message } = req.body;

        if (!name || !email || !machine || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        await Consultation.create({ name, email, machine, message });

        return res.status(201).json({
            success: true,
            message: "Consultation submitted successfully!"
        });

    } catch (err) {
        next(err);
    }
};



// delete consultation
const deleteConsultationController = async (req, res, next) => {
    try {

        const { consultationId } = req.params;

        const consultation = await Consultation.findById(consultationId);

        if (!consultation) {
            throw new Error("Consultation not found!");
        }

        await Consultation.findByIdAndDelete(consultationId);

        return res.status(200).json({
            success: true,
            message: "Consultation deleted successfully!"
        });

    } catch (err) {
        next(err);
    }
};



export { getAllConsultationsController, submitConsultationController, deleteConsultationController };
