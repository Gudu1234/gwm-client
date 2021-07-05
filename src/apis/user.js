/**
 * Created by Soumya (soumya@smarttersstudio.com) on 29/05/21 at 6:35 PM.
 */
import {userService} from '../config/endpoints';
import moment from 'moment';

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

export const editDetails = (id, data) => userService.patch(
    id,
    data,
    {
        query: {
            $populate: 'zone'
        }
    }
);

export const removeWorker = (id) => userService.remove(
    id,
);

export const getUserDetails = (id) => userService.get(
    id,
    {
        query: {
            $populate: 'zone'
        }
    }
);

export const monitorDrivers = () => userService.find({
    query: {
        role: 2,
        status: 1,
        coordinatesUpdatedAt: {
            $gte: moment().subtract(60, 'minutes').toDate(),
            $lte: moment().add(60, 'minutes').toDate(),
        },
        // coordinatesUpdatedAt: { $ne: null },
        $limit: -1,
        $populate: 'zone',
    }
});