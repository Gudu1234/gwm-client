/**
 * Created by Soumya (soumya@smarttersstudio.com) on 18/05/21 at 1:52 AM.
 */

import {contactService} from '../config/endpoints';

export const createContact = (data) => contactService.create(data);