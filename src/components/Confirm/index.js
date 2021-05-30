/**
 * Created by Soumya (soumya@smarttersstudio.com) on 29/05/21 at 9:25 PM.
 */

import ConfirmDialog from './confirmDialog';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(ConfirmDialog);

/**
 *
 * @param title {string}
 * @param message {string}
 * @param okLabel {string}
 * @param options {{}}
 * @returns {*}
 * @constructor
 */
const Confirm = (title, message, okLabel, options = {}) =>
    confirm({ ...options, title, confirmation: message, okLabel });

export default Confirm;
