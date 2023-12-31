const User = require('../models/User')

const basicAuth = async (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }
    const credentials = Buffer.from(authHeader.split(" ")[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    //console.log(credentials);

    try {
        const authorizedUser = await User.findOne({ username, password });
    
        if (!authorizedUser) {
          return res.status(401).send('Unauthorized');
        }
    
        // If the user is authorized, attach the user object to the request for later use
        req.user = authorizedUser;
        next();
      }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
      }
}

module.exports = basicAuth;