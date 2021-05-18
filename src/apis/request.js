/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 2:21 AM.
 */

import {requestService} from '../config/endpoints';

export const createRequest = (data) => requestService.create(data);