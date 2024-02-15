//unknown routes 404

const notFound=(req,res,next)=>{
    const error=new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
const errorHandler=(error,req,res,next)=>{
    //if res already has sent
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({message:error.message || "an unknown error occured"});


}
module.exports={notFound,errorHandler};