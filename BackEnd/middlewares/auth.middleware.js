import { blacklist } from "../models/blackList.Token.js";
import { captainModel } from "../models/captain.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";


export default async function  AuthUser(req, res, next) {

    const token = req.cookies.token||req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const blackList =await blacklist.findOne({ token:token});

    if(blackList){
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

        try {
            const decoded = jwt.verify(token, 'TXNQzh7dcKq/kb7WXhw22IaYI/cHd7y7vRezaLHeWOQS=');
            req.user = await User.findById(decoded.id)
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
    
}

export async function  AuthCaptain(req, res, next) {

    const token = req.cookies.token||req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const blackList =await blacklist.findOne({ token:token});

    if(blackList){
        return res.status(401).json({ message: 'Token is blacklisted' });
    }

        try {
            const decoded = jwt.verify(token, 'TXNQzh7dcKq/kb7WXhw22IaYI/cHd7y7vRezaLHeWOQS=');
            req.captain=await captainModel.findById(decoded.id)
            next();


}
catch(e){
    console.log(e)
    return res.status(401).json({ message: 'Token is not valid' });
}



}