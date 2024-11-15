import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendEmail } from "../mailtrap/mailer.js";
import { sendWelcomeEmail } from "../mailtrap/mailer.js";
import { sendPasswordResetEmail } from "../mailtrap/mailer.js";
import { sendResetSuccessEmail } from "../mailtrap/mailer.js";
import crypto from "crypto"
import bcryptjs from 'bcryptjs'

export const signup = async (req,res) => {
	console.log("Request Body:", req.body);
    const email =req.body.email;
	const password = req.body.password;
	const name = req.body.name;
	const role = req.body.role;
    try {
        if(!email || !password || !name || !role){
            throw new Error("All fields are required");
        }
            const UserAlreadyExists = await User.findOne({email});
            if(UserAlreadyExists){
                return res.status(400).json({success:false,message : "User already exists"});
            }
            const hashedPassword = await bcryptjs.hash(password,10);
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            const user = new User({
                email,
                password : hashedPassword,
                name,
				role,
                verificationToken,
                verificationTokenExpiresAt : Date.now() + 5*60*1000

            })
        await user.save();
        generateTokenAndSetCookie(res,user._id);
        await sendEmail(user.email,verificationToken);
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        return res.status(400).json({success:false,message : error.message});
    }
}

export const verifyEmail = async (req, res) => {
	const code = req.body.verificationToken;
	console.log(code);
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now()},
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};