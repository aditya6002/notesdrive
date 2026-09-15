const jwt = require('jsonwebtoken');

 const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie:");
  console.log(token);
  

  if(!token){
    return res.status(401).json({message : 'Access denied. No token provided.'});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({message : 'Invalid token.'});
    }
    req.user = user;
    next();
    
  });
}

module.exports = {
  authenticateToken
}