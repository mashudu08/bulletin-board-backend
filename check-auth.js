const jwt = require('jsonwebtoken');

module.exports =(req,res,next) =>
{
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        jwt.verify(token,"secret")
        next();
    }
    catch(error)
    {
        console.log(error);
        res.status(401).json({
            message:"Token not authenticated, sign in/register"
        });
    }
};