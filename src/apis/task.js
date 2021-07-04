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

export const changeTaskStatus = (id, status) => taskService.patch(
    id,
    {
        status,
    }
);

export const requestTask = (binId) => taskService.create({binId});