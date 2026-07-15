exports.getStatus = (req,res)=>{
    res.json({
        status:"online",
        service:"DevOps Platform API",
        version:"1.0.0"
    });
};
