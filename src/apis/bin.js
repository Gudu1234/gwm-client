/**
 * Created by Soumya (soumya@smarttersstudio.com) on 15/06/21 at 11:48 PM.
 */
import {binService, nearbyWorkerService} from '../config/endpoints';

export const getAllBins = ($skip, $limit, $search, type) => binService.find({
    query: {
        $skip,
        $limit,
        status: 1,
        $sort: { createdAt: -1 },
        worker: type,
        $or: [
            { binId: { $search } },
            { landmark: { $search } },
            { pinCode: { $search } },
        ]
    }
});

export const getParentBins = (zone, landmark) => binService.find({
    query: {
        $limit: -1,
        zone,
        landmark,
        $select: ['binId'],
        parent: 'null',
    }
});

export const createBin = (binData) => binService.create(binData);

export const getNearbyWorkers = (coordinates, binType, zone) => nearbyWorkerService.find({
    query: {
        coordinates,
        binType,
        zone
    }
});

export const getNearbyCleaners = (coordinates, binType, zone, parent) => nearbyWorkerService.find({
    query: {
        coordinates,
        binType,
        zone,
        parent
    }
});

export const getBinsOfWorker = (workerId) => binService.find({
    query: {
        worker: workerId,
        $limit: 30,
    }
});