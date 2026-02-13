export const globalErrorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const errMessage = err.message || "Server error";

    return res.status(statusCode).json({
        success: false,
        message: errMessage,
    });

};