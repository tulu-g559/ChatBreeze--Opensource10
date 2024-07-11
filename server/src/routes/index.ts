import express from 'express'
import { signIn } from '../controllers/signin.controller';
import { signUp } from '../controllers/signup.controller';
import { verifyOtp } from '../controllers/verifyOtp.controller';
import { addUser } from '../controllers/addUser.controller';
import { getContacts } from '../controllers/getContacts.controller';
import { message } from '../controllers/messages.controller';
import { userDetails } from '../controllers/userDetails.controller';
import { detailsUpdate } from '../controllers/detailsUpdate.controller';


const router = express.Router();

// SignIn Route
router.route('/signin').post(signIn);

// SignUp Route
router.route('/signup').post(signUp);

// VerifyOTP Route
router.route('/verify').post(verifyOtp);

// AddUser Route
router.route('/adduser').post(addUser);

// GetUserData Route
router.route('/getContacts').post(getContacts);

// Messages Route
router.route('/message').post(message);

// Update User Route
router.route('/userDetails/:userId').post(userDetails);

// UserDetails Update Route
router.route('/detailsUpdate/:userId').post(detailsUpdate);


export {router};