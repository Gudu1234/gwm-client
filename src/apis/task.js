/**
 * Created By Soumya(soumya@smarttersstudio.com) on 03/07/21 at 11:48 AM.
 */
import {taskService} from '../config/endpoints';
import moment from 'moment';

export const getAllTasks = (status = { $ne: 0 }) => taskService.find({
    query: {
        status,
        $limit: -1,
        $populate: 'bin',
        date: {
            $gte: moment().startOf('day').toDate(),
            $lte: moment().endOf('day').toDate(),
        }
    }
});

export const getTasksOfWorker = (worker) => taskService.find({
    query: {
        status: { $in: [1, 2] },
        $limit: -1,
        $populate: 'bin',
        date: {
            $gte: moment().startOf('day').toDate(),
            $lte: moment().endOf('day').toDate(),
        },
        worker,
        $select: ['status', 'bin']
    }
})

export const changeTaskStatus = (id, status) => taskService.patch(
    id,
    {
        status,
    }
);

export const requestTask = (binId) => taskService.create({binId});