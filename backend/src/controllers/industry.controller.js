const getAllIndustriesController = async (req, res, next) => {
    try {
        
        return res.json({ msg: "Welcome" });
         
    } catch (err) {
        next(err);
    }
}



export {
    getAllIndustriesController
}