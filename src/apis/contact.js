/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 1:52 AM.
 */

import {contactService, requestService} from '../config/endpoints';

export const createContact = (data) => contactService.create(data);

export const getAllFeedbacks = ($skip, $limit, $search, feedbackType, status) => contactService.find({
    query: {
        $skip,
        $limit,
        feedbackType,
        status,
        $sort: { createdAt: -1 },
        $or: [
            { name: { $search } },
            { pinCode: { $search } },
            { phone: { $search } },
        ]
    }
});

export const getAllComplaints = ($skip, $limit, $search, status) => contactService.find({
    query: {
        $skip,
        $limit,
        feedbackType: 3,
        status,
        $sort: { createdAt: status === 1 ? 1 : -1 },
        $or: [
            { name: { $search } },
            { pinCode: { $search } },
            { phone: { $search } },
        ]
    }
});

export const updateContactStatus = (id, status) => contactService.patch(
    id,
    {
        status
    }
);

export const removeContact = (id) => contactService.remove(id);