import { Application } from "../models/Application.js";




// get all applications controller
const getAllApplicationsController = async (req, res, next) => {
    try {
        
        const applications = await Application.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: applications
        });

    } catch (err) {
        next(err);
    }
}



// submit application controller
const submitApplicationController = async (req, res, next) => {
    try {

        const { firstName, lastName, email, companyName, companyEmail, companyAddress, message } = req.body;

        if (!firstName || !lastName || !email || !companyName || !companyEmail || !companyAddress || !message) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        if (message.length < 20) {
            return res.status(400).json({ success: false, message: "Message must be at least 20 characters!" });
        }

        await Application.create({
            firstName,
            lastName,
            email,
            companyName,
            companyEmail,
            companyAddress,
            message
        });


        res.status(201).json({
            success: true,
            message: "Application submitted successfully!",
        });

    } catch (err) {
        next(err);
    }
};





// application delete controller
const deleteApplicationController = async (req, res, next) => {
    try {

        const { applicationId } = req.params;

        const application = await Application.findOne({ _id: applicationId });

        if (!application) {
            throw new Error("Application not found!");
        }

        await Application.findByIdAndDelete(applicationId);

        return res.status(200).json({
            success: true,
            message: "Application deleted successfully!"
        })
        
    } catch (err) {
        next(err);
    }
}



export { getAllApplicationsController, submitApplicationController, deleteApplicationController }