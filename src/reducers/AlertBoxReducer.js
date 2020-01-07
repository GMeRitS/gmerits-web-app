import createReducer from '../lib/utils/CreateReducer';
import UserConstants from '../constants/UserConstants';

const { POP_UP_MESSAGE } = UserConstants;

export const getInitialState = () => ({
  visible: false,
  alertText: 'default alert Text',
  leftOption: 'OK',
  leftOptionVisible: false
});

export default createReducer(getInitialState, {
  ['DISPLAY_ALERT']: (state, { payload: { alertOptions } }) => ({
    visible: true,
    alertText: alertOptions.alertText,
    leftOption: alertOptions.leftOption,
    leftOptionVisible: alertOptions.leftOptionVisible
  }),
  ['HIDE_ALERT']: (state, { payload: popupOptions }) => ({
    visible: false
  })
});
