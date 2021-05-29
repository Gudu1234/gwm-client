/**
 * Created by Soumya (soumya@smarttersstudio.com) on 29/05/21 at 6:35 PM.
 */
import {userService} from '../config/endpoints';

export const getAllCleaners = ($skip, $limit, $search) => userService.find({
    query: {
        role: 1,
        $skip,
        $limit,
        // $search
    }
});

export const getAllDrivers = ($skip, $limit, $search) => userService.find({
    query: {
        role: 2,
        $skip,
        $limit,
        // $search
    }
});