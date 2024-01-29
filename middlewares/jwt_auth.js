// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//     let accessToken = req.cookies.jwt;
//     const JWT_SECRET = "IAMABHAY"; 
//     //if no token in cookies request unauth
//     if (!accessToken) {
//         return res.status(403).json({
//             error: "Unauthorized",
//         });
//     }

//     let payload;
//     try {
//         payload = jwt.verify(accessToken, JWT_SECRET);
//         req._id = payload._id;
//         next();
//     } catch (e) {
//         console.error('JWT Verification Error:', e.message);
//         return res.status(401).json({
//             error: "Unauthorized",
//         });
//     }
    
// };
