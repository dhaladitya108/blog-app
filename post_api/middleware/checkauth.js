const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'skasjashh3433222111f');
        next();
    }catch(e){
        res.status(401).json({
            message : "Unauthorized Access"
        })
    }
   
}

