/**
 * Created by Soumya (soumya@smarttersstudio.com) on 17/05/21 at 2:11 PM.
 */

import { zoneService } from '../config/endpoints';

export const getAllZones = () => zoneService.find();