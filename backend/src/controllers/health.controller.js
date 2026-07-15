exports.getHealth = (req,res)=>{

    res.json({
        status:"healthy",
        uptime: process.uptime(),
        environment: process.platform,
        timestamp: new Date()
    });

};
