/**
 * Created by Soumya (soumya@smarttersstudio.com) on 29/05/21 at 6:35 PM.
 */
import {userService} from '../config/endpoints';

export const getAllCleaners = ($skip, $limit, $search) => userService.find({
    query: {
        role: 1,
        $skip,
        $limit,
        $or: [
            { name: { $search } },
            { username: { $search } },
            { phone: { $search } },
            { 'address.street': { $search } }
        ]
        // $search
    }
});

export const getAllDrivers = ($skip, $limit, $search) => userService.find({
    query: {
        role: 2,
        $skip,
        $limit,
        $or: [
            { name: { $search } },
            { username: { $search } },
            { phone: { $search } },
            { 'address.street': { $search } }
        ]
    }
});

export const createWorker = (
    name,
    email,
    password,
    phone,
    address,
    role,
    gender,
    userWorkType,
    avatar
) => userService.create({
    name,
    email,
    password,
    phone,
    address,
    role,
    gender,
    userWorkType,
    avatar
});