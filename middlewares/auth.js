// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = authenticate;
