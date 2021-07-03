/**
 * Created By Soumya(soumya@smarttersstudio.com) on 03/07/21 at 11:48 AM.
 */
import {taskService} from '../config/endpoints';

export const getAllTasks = (status = { $ne: 0 }) => taskService.find({
    query: {
        status,
        $limit: -1
    }
});

export const changeTaskStatus = (id, status) => taskService.patch(
    id,
    {
        status,
    }
);