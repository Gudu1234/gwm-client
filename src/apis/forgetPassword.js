/**
 * Created by Soumya (soumya@smarttersstudio.com) on 19/06/21 at 11:39 AM.
 */


import {forgetPasswordService, resetPasswordService, verifyOtpService} from '../config/endpoints';

export const forgetPassword = (email) => forgetPasswordService.create({
    email
});

export const verifyOtp = (email, otp) => verifyOtpService.create({
    email,
    otp
});

export const resetPassword = (token, newPassword, confirmPassword) => resetPasswordService.create({
    token,
    newPassword,
    confirmPassword
});