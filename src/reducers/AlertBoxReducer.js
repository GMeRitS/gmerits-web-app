import createReducer from '../lib/utils/CreateReducer';
import UserConstants from '../constants/UserConstants';

const { POP_UP_MESSAGE } = UserConstants;

export const getInitialState = () => ({
  visible: false,
  alertTextLabel: 'default alert text label',
  alertText: 'default alert Text',
  leftOption: 'buttonLeft',
  rightOption: 'buttonRight',
  leftOptionVisible: false,
  rightOptionVisible: false
});

export default createReducer(getInitialState, {
  ['DISPLAY_ALERT']: (state, { payload: { alertOptions } }) => ({
    visible: true,
    alertTextLabel: alertOptions.alertTextLabel,
    alertText: alertOptions.alertText,
    leftOption: alertOptions.leftOption,
    rightOption: alertOptions.rightOption,
    leftOptionVisible: alertOptions.leftOptionVisible,
    rightOptionVisible: alertOptions.rightOptionVisible
  }),
  ['HIDE_ALERT']: () => ({
    visible: false
  })
});
