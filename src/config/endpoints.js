import app from '../apis/index';

export const requestService = app.service('request');

export const contactService = app.service('contact');

export const zoneService = app.service('zone');

export const userService = app.service('user');

export const binService = app.service('bin');

export const nearbyWorkerService = app.service('nearby-workers');

export const uploadService = app.service('upload');

export const forgetPasswordService = app.service('forget-password');

export const verifyOtpService = app.service('verify-password-otp');

export const resetPasswordService = app.service('reset-password');

export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('uri[]', file);
    formData.append('folderName', 'GWM');
    return uploadService.create(formData);
};