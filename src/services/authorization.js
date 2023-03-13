const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
   // const authHeader = req.headers['authorization'];
   const token = req.body.token;
   if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
   }
   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
         return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded.userId._id;
      next();
   });
};

module.exports = authenticateToken;
