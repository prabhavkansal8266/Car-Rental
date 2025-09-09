// import { response } from "express";
// import jwt from "jsonwebtoken"
// import User from "../models/User.js";


// export const protect = async (req, res, next)=>{
//     const token = req.headers.authorization;

//     if(!token){
//         return response.json({success: false, message: "not authorized"})
//     }
//     try {
//         const userId = jwt.decode(token, process.env.JWT_SECRET)
//         if(!userId){
//             return response.json({success: false, message: "not authorized"})
//         }
//         req.user = await User.findById(userId).select("-password")
//         next();
//     } catch (error) {
//        return response.json({success: false, message: "not authorized"})                                                                                                                                                             
//     }
// }
// =======================================

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to req
    const user = await User.findById(decoded);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
