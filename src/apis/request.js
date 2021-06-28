/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 2:21 AM.
 */

import {requestService} from '../config/endpoints';

export const createRequest = (data) => requestService.create(data);

export const getAllRequests = ($skip, $limit, $search, status) => requestService.find({
    query: {
        $skip,
        $limit,
        status,
        $sort: { createdAt: status === 1 ? 1 : -1 },
        $or: [
            { name: { $search } },
            { pinCode: { $search } },
            { phone: { $search } },
            { street: { $search } },
            { reqId: { $search } }
        ]
    }
});

export const updateRequestStatus = (id, status) => requestService.patch(
    id,
    {
        status
    }
);

export const removeRequest = (id) => requestService.remove(id);